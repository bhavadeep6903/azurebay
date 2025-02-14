package com.example.service;

import java.util.List;
import java.util.Optional;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.model.Airpods;
import com.example.model.Homeapp;
import com.example.model.Ipads;
import com.example.model.Laptops;
import com.example.model.Login;
import com.example.model.Mobiles;
import com.example.model.Search;
import com.example.model.Watches;
import com.example.repo.AirpodsRepo;
import com.example.repo.HomeappRepo;
import com.example.repo.IpadsRepo;
import com.example.repo.LaptopsRepo;
import com.example.repo.LoginRepo;
import com.example.repo.MobilesRepo;
import com.example.repo.SearchRepo;
import com.example.repo.WatchesRepo;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

import io.jsonwebtoken.io.IOException;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Service
public class ExcelrService {

	@Autowired
	private LoginRepo loginRepo;
	
	@Autowired
	private LaptopsRepo laptopsRepo;
	
	@Autowired
	private MobilesRepo mobilesRepo;
	
	
	@Autowired
	private WatchesRepo watchesRepo;
	
	@Autowired
	private AirpodsRepo airpodsRepo;
	
	@Autowired
	private HomeappRepo homeappRepo;
	
	
	@Autowired
	private IpadsRepo ipadsRepo;
	
	 @Autowired 
	 private SearchRepo searchRepo;
	
	
	@Value("${aws.s3.bucket.name}")
	 private String bucketName;
	    
	    
	 @Value("${aws.accessKeyId}")
	 private String accessKeyId;

	 @Value("${aws.secretAccessKey}")
	 private String secretAccessKey;
	 
	 public List<Search> findProductsByKeyword(String keyword) {
		 return searchRepo.findProductsByUnion(keyword); 
		 
	 }
	 
	 
	//razorpay

     public String createOrder(int amount, String currency, String receipt) throws RazorpayException {
        RazorpayClient razorpay = new RazorpayClient("rzp_live_0CAWJFt3q8oaUX", "GbtM4BCQJJyyBA4L0NjnwmZV");

        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amount * 100); // Amount in paise
        orderRequest.put("currency", currency);
        orderRequest.put("receipt", receipt);

        Order order = razorpay.orders.create(orderRequest);
        return order.toString();
    }

    public boolean verifyPayment(String orderId, String paymentId, String signature) {
        String generatedSignature = HmacSHA256(orderId + "|" + paymentId, "GbtM4BCQJJyyBA4L0NjnwmZV");
        return generatedSignature.equals(signature);
    }

    private String HmacSHA256(String data, String secret) {
        try {
            javax.crypto.Mac mac = javax.crypto.Mac.getInstance("HmacSHA256");
            mac.init(new javax.crypto.spec.SecretKeySpec(secret.getBytes(), "HmacSHA256"));
            byte[] hmacData = mac.doFinal(data.getBytes());
            return javax.xml.bind.DatatypeConverter.printHexBinary(hmacData).toLowerCase();
        } catch (Exception e) {
            throw new RuntimeException("Failed to calculate HMAC SHA256", e);
        }
    }
	 
	 	
	//getting reference of s3 buckets
		 private final S3Client s3Client = S3Client.builder()
		            .region(Region.EU_NORTH_1)
		            .credentialsProvider(StaticCredentialsProvider.create(
		                AwsBasicCredentials.create("AKIAZ7SAKWCR5VR2XDPN", "zpC/2fkmDtqtJU8G4hLcwPnbYaDoevshSYPSC6Nq")
		            ))
		            .build();

		 
		 
		 public Optional<Login> updateLogin(int id, Login updatedLogin) {
		        Optional<Login> existingLogin = loginRepo.findById(id);

		        if (existingLogin.isPresent()) {
		            Login login = existingLogin.get();
		            if (updatedLogin.getUsername() != null) {
		                login.setUsername(updatedLogin.getUsername());
		            }
		            if (updatedLogin.getPassword() != null) {
		                login.setPassword(updatedLogin.getPassword());
		            }
		            if (updatedLogin.getRole() != null) {
		                login.setRole(updatedLogin.getRole());
		            }
		            if (updatedLogin.getEmail() != null) {
		                login.setEmail(updatedLogin.getEmail());
		            }
		            if (updatedLogin.getNumber() != null) {
		                login.setNumber(updatedLogin.getNumber());
		            }

		            loginRepo.save(login);
		            return Optional.of(login);
		        }

		        return Optional.empty();
		    }

		 
		 
		 public void deleteLogin(Integer id) {
			    // Fetch the login from the database
			    Login login = loginRepo.findById(id)
			            .orElseThrow(() -> new RuntimeException("Login not found"));

			    // Uncommented lines with added semicolons
			    String username = login.getUsername();
			    String password = login.getPassword();
			    String role = login.getRole();

			    // Log the details (Optional)
			    System.out.println("Deleting login: Username=" + username + ", Role=" + role);

			    loginRepo.deleteById(id);
			}
	
	
	//Register Page
	public Login saveUser(Login login) {
		return loginRepo.save(login);
	}
	
	
	//getData
	public List<Laptops> findAllLaptops(){
		return laptopsRepo.findAll();
	}
	
	public List<Mobiles> findAllMobiles(){
		return mobilesRepo.findAll();
	}
	
	public List<Ipads> findAllIpads(){
		return ipadsRepo.findAll();
	}
	
	public List<Airpods> findAllAirpods(){
		return airpodsRepo.findAll();
	}
	
	public List<Watches> findAllWatches(){
		return watchesRepo.findAll();
	}
	
	public List<Homeapp> findAllHomeapp(){
		return homeappRepo.findAll();
	}
	
	
	public Laptops saveLaptop(String name, Long cost, Long quantity, MultipartFile file , Double discount , String description) throws IOException {
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        try {
            // Upload to S3
            s3Client.putObject(
                PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(fileName)
                    .contentType("image/jpeg")
                    .build(),
                RequestBody.fromBytes(file.getBytes())
            );
        } catch (Exception e) {
            throw new RuntimeException("Error uploading file to S3: " + e.getMessage());
        }

        //String fileUrl = String.format("https://%s.s3.%s.amazonaws.com/%s", bucketName, Region.US_EAST_1.id(), fileName);

        String fileUrl = String.format("https://%s.s3.%s.amazonaws.com/%s", bucketName, Region.EU_NORTH_1.id(), fileName);
        System.out.println("File uploaded successfully. File URL: " + fileUrl);

        
        try {
            // Save to database
            Laptops laptop = new Laptops();
            laptop.setName(name);
            laptop.setCost(cost);
            laptop.setImage(fileUrl);
            laptop.setQuantity(quantity);
            laptop.setDescription(description);
            laptop.setDiscount(discount);
            System.out.println("Saving Laptop: pname=" + name + ", pcost=" + cost + ", pimage=" + fileUrl);

            return laptopsRepo.save(laptop);
        } catch (Exception e) {
            throw new RuntimeException("Error saving laptop to database: " + e.getMessage());
        }
    }
	
	
	//delete laptops
	
	public void deleteLaptops(Long id) {
      Laptops laptops=laptopsRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
      
      String fileUrl = laptops.getImage();
      String fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);

      // Delete the file from S3
      try {
          s3Client.deleteObject(
              DeleteObjectRequest.builder()
                  .bucket(bucketName)
                  .key(fileName)
                  .build()
          );
      } catch (Exception e) {
          throw new RuntimeException("Error deleting file from S3: " + e.getMessage());
      }
      laptopsRepo.delete(laptops);
    }
	
	
	 public Laptops updateLaptop(Long id, String name, Long cost, Long quantity, MultipartFile file , Long discount , String description) throws IOException {
	        Laptops existingLaptops = laptopsRepo.findById(id)
	                .orElseThrow(() -> new IllegalArgumentException("Laptop not found"));

	        // Update fields if provided
	        if (name != null && !name.isEmpty()) {
	            existingLaptops.setName(name);
	        }
	        if (cost != null && cost > 0) {
	            existingLaptops.setCost(cost);
	        }
	        if (quantity != null && quantity > 0) {
	            existingLaptops.setQuantity(quantity);
	        }
	        
	        if (discount != null && discount > 0) {
	            existingLaptops.setDiscount(null);
	        }

	        // Handle file update if a new file is provided
	        if (file != null && !file.isEmpty()) {
	            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
	            try {
	                s3Client.putObject(
	                    PutObjectRequest.builder()
	                        .bucket(bucketName)
	                        .key(fileName)
	                        .contentType(file.getContentType())
	                        .build(),
	                    RequestBody.fromBytes(file.getBytes())
	                );
	            } catch (Exception e) {
	                throw new RuntimeException("Error uploading new file to S3: " + e.getMessage());
	            }

	            String fileUrl = String.format("https://%s.s3.%s.amazonaws.com/%s", bucketName, Region.EU_NORTH_1.id(), fileName);
	            existingLaptops.setImage(fileUrl);
	        }

	        return laptopsRepo.save(existingLaptops);
	    }
	 
 //   Mobiles insert update and delete

	 

	 

	 public Mobiles saveMobiles(String name, Long cost, Long quantity, MultipartFile file , Double discount , String description) throws IOException {

	        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

	        try {

	            // Upload to S3

	            s3Client.putObject(

	                PutObjectRequest.builder()

	                    .bucket(bucketName)

	                    .key(fileName)

	                    .contentType("image/jpeg")

	                    .build(),

	                RequestBody.fromBytes(file.getBytes())

	            );

	        } catch (Exception e) {

	            throw new RuntimeException("Error uploading file to S3: " + e.getMessage());

	        }



	        //String fileUrl = String.format("https://%s.s3.%s.amazonaws.com/%s", bucketName, Region.US_EAST_1.id(), fileName);



	        String fileUrl = String.format("https://%s.s3.%s.amazonaws.com/%s", bucketName, Region.EU_NORTH_1.id(), fileName);

	        System.out.println("File uploaded successfully. File URL: " + fileUrl);



	        

	        try {

	            // Save to database

	            Mobiles mobiles=  new Mobiles();

	            mobiles.setName(name);

	            mobiles.setCost(cost);

	            mobiles.setImage(fileUrl);

	            mobiles.setQuantity(quantity);

	            mobiles.setDescription(description);

	            mobiles.setDiscount(discount);

	            System.out.println("Saving Mobiles: pname=" + name + ", pcost=" + cost + ", pimage=" + fileUrl);



	            return mobilesRepo.save(mobiles);

	        } catch (Exception e) {

	            throw new RuntimeException("Error saving laptop to database: " + e.getMessage());

	        }

	    }

	 

	 public Mobiles updateMobiles(Long id, String name, Long cost, Long quantity, MultipartFile file, Double discount , String description) throws IOException {

		 Mobiles existingMobiles = mobilesRepo.findById(id)

	                .orElseThrow(() -> new IllegalArgumentException("Mobiles not found"));



	        // Update fields if provided

	        if (name != null && !name.isEmpty()) {

	        	existingMobiles.setName(name);

	        }

	        if (cost != null && cost > 0) {

	        	existingMobiles.setCost(cost);

	        }

	        if (quantity != null && quantity > 0) {

	        	existingMobiles.setQuantity(quantity);

	        }

	        

	        if (discount !=null && discount>0) {

	        	existingMobiles.setDiscount(discount);

	        }





	        // Handle file update if a new file is provided

	        if (file != null && !file.isEmpty()) {

	            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

	            try {

	                s3Client.putObject(

	                    PutObjectRequest.builder()

	                        .bucket(bucketName)

	                        .key(fileName)

	                        .contentType(file.getContentType())

	                        .build(),

	                    RequestBody.fromBytes(file.getBytes())

	                );

	            } catch (Exception e) {

	                throw new RuntimeException("Error uploading new file to S3: " + e.getMessage());

	            }



	            String fileUrl = String.format("https://%s.s3.%s.amazonaws.com/%s", bucketName, Region.EU_NORTH_1.id(), fileName);

	            existingMobiles.setImage(fileUrl);

	        }



	        return mobilesRepo.save(existingMobiles);

	    }

	

	 

	 public void deleteMobiles(Long id) {

	        // Fetch the laptop from the database

	        Mobiles mobiles = mobilesRepo.findById(id)

	                .orElseThrow(() -> new RuntimeException("Mobile not found"));



	        String fileUrl = mobiles.getImage();

	        String fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);



	        // Delete the file from S3

	        try {

	            s3Client.deleteObject(

	                DeleteObjectRequest.builder()

	                    .bucket(bucketName)

	                    .key(fileName)

	                    .build()

	            );

	        } catch (Exception e) {

	            throw new RuntimeException("Error deleting file from S3: " + e.getMessage());

	        }



	        // Delete the laptop from the database

	        mobilesRepo.deleteById(id);

	    }

	 

 //   Ipads insert update and delete

	 

	 public Ipads saveIpads(String name, Long cost, Long quantity, MultipartFile file , Double discount , String description) throws IOException {

	        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

	        try {

	            // Upload to S3

	            s3Client.putObject(

	                PutObjectRequest.builder()

	                    .bucket(bucketName)

	                    .key(fileName)

	                    .contentType("image/jpeg")

	                    .build(),

	                RequestBody.fromBytes(file.getBytes())

	            );

	        } catch (Exception e) {

	            throw new RuntimeException("Error uploading file to S3: " + e.getMessage());

	        }



	        //String fileUrl = String.format("https://%s.s3.%s.amazonaws.com/%s", bucketName, Region.US_EAST_1.id(), fileName);



	        String fileUrl = String.format("https://%s.s3.%s.amazonaws.com/%s", bucketName, Region.EU_NORTH_1.id(), fileName);

	        System.out.println("File uploaded successfully. File URL: " + fileUrl);



	        

	        try {

	            // Save to database

	            Ipads ipads=new Ipads();

	            ipads.setName(name);

	            ipads.setCost(cost);

	            ipads.setImage(fileUrl);

	            ipads.setQuantity(quantity);

	            ipads.setDescription(description);

	            ipads.setDiscount(discount);

	            System.out.println("Saving Ipads: pname=" + name + ", pcost=" + cost + ", pimage=" + fileUrl);



	            return ipadsRepo.save(ipads);

	        } catch (Exception e) {

	            throw new RuntimeException("Error saving ipads to database: " + e.getMessage());

	        }

	    }

	 

	 public Ipads updateIpads(Long id, String name, Long cost, Long quantity, MultipartFile file, Double discount , String description) throws IOException {

	        Ipads existingIpads = ipadsRepo.findById(id)

	                .orElseThrow(() -> new IllegalArgumentException("Ipads not found"));



	        // Update fields if provided

	        if (name != null && !name.isEmpty()) {

	        	existingIpads.setName(name);

	        }

	        if (cost != null && cost > 0) {

	        	existingIpads.setCost(cost);

	        }

	        if (quantity != null && quantity > 0) {

	        	existingIpads.setQuantity(quantity);

	        }

	        

	        if (discount !=null && discount>0) {

	        	existingIpads.setDiscount(discount);

	        }





	        // Handle file update if a new file is provided

	        if (file != null && !file.isEmpty()) {

	            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

	            try {

	                s3Client.putObject(

	                    PutObjectRequest.builder()

	                        .bucket(bucketName)

	                        .key(fileName)

	                        .contentType(file.getContentType())

	                        .build(),

	                    RequestBody.fromBytes(file.getBytes())

	                );

	            } catch (Exception e) {

	                throw new RuntimeException("Error uploading new file to S3: " + e.getMessage());

	            }



	            String fileUrl = String.format("https://%s.s3.%s.amazonaws.com/%s", bucketName, Region.EU_NORTH_1.id(), fileName);	

	            existingIpads.setImage(fileUrl);

	        }



	        return ipadsRepo.save(existingIpads);

	    }

	

	 

	 public void deleteIpads(Long id) {

	        // Fetch the laptop from the database

	        Ipads ipads = ipadsRepo.findById(id)

	                .orElseThrow(() -> new RuntimeException("ipads not found"));



	        String fileUrl = ipads.getImage();

	        String fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);



	        // Delete the file from S3

	        try {

	            s3Client.deleteObject(

	                DeleteObjectRequest.builder()

	                    .bucket(bucketName)

	                    .key(fileName)

	                    .build()

	            );

	        } catch (Exception e) {

	            throw new RuntimeException("Error deleting file from S3: " + e.getMessage());

	        }



	        // Delete the laptop from the database

	        ipadsRepo.deleteById(id);

	    }

	 

	 

	 

	 

//   Airpods insert update and delete

	 
	 public Airpods saveAirpods(String name, Long cost, Long quantity, MultipartFile file , Double discount , String description) throws IOException {

	        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

	        try {

	            // Upload to S3

	            s3Client.putObject(

	                PutObjectRequest.builder()

	                    .bucket(bucketName)

	                    .key(fileName)

	                    .contentType("image/jpeg")

	                    .build(),

	                RequestBody.fromBytes(file.getBytes())

	            );

	        } catch (Exception e) {

	            throw new RuntimeException("Error uploading file to S3: " + e.getMessage());

	        }



	        //String fileUrl = String.format("https://%s.s3.%s.amazonaws.com/%s", bucketName, Region.US_EAST_1.id(), fileName);



	        String fileUrl = String.format("https://%s.s3.%s.amazonaws.com/%s", bucketName, Region.EU_NORTH_1.id(), fileName);

	        System.out.println("File uploaded successfully. File URL: " + fileUrl);



	        

	        try {

	            // Save to database

	            Airpods airpods=new Airpods();

	            airpods.setName(name);

	            airpods.setCost(cost);

	            airpods.setImage(fileUrl);

	            airpods.setQuantity(quantity);

	            airpods.setDescription(description);

	            airpods.setDiscount(discount);

	            System.out.println("Saving Airpods: pname=" + name + ", pcost=" + cost + ", pimage=" + fileUrl);



	            return airpodsRepo.save(airpods);

	        } catch (Exception e) {

	            throw new RuntimeException("Error saving laptop to database: " + e.getMessage());

	        }

	    }

	 

	 public Airpods updateAirpods(Long id, String name, Long cost, Long quantity, MultipartFile file, Double discount , String description) throws IOException {

	        Airpods existingAirpods = airpodsRepo.findById(id)

	                .orElseThrow(() -> new IllegalArgumentException("Airpods not found"));



	        // Update fields if provided

	        if (name != null && !name.isEmpty()) {

	        	existingAirpods.setName(name);

	        }

	        if (cost != null && cost > 0) {

	        	existingAirpods.setCost(cost);

	        }

	        if (quantity != null && quantity > 0) {

	        	existingAirpods.setQuantity(quantity);

	        }

	        

	        if (discount !=null && discount>0) {

	        	existingAirpods.setDiscount(discount);

	        }





	        // Handle file update if a new file is provided

	        if (file != null && !file.isEmpty()) {

	            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

	            try {

	                s3Client.putObject(

	                    PutObjectRequest.builder()

	                        .bucket(bucketName)

	                        .key(fileName)

	                        .contentType(file.getContentType())

	                        .build(),

	                    RequestBody.fromBytes(file.getBytes())

	                );

	            } catch (Exception e) {

	                throw new RuntimeException("Error uploading new file to S3: " + e.getMessage());

	            }



	            String fileUrl = String.format("https://%s.s3.%s.amazonaws.com/%s", bucketName, Region.EU_NORTH_1.id(), fileName);

	            existingAirpods.setImage(fileUrl);

	        }



	        return airpodsRepo.save(existingAirpods);

	    }

	

	 

	 public void deleteAirpods(Long id) {

	        // Fetch the laptop from the database

	        Airpods airpods = airpodsRepo.findById(id)

	                .orElseThrow(() -> new RuntimeException("Airpods not found"));



	        String fileUrl = airpods.getImage();

	        String fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);



	        // Delete the file from S3

	        try {

	            s3Client.deleteObject(

	                DeleteObjectRequest.builder()

	                    .bucket(bucketName)

	                    .key(fileName)

	                    .build()

	            );

	        } catch (Exception e) {

	            throw new RuntimeException("Error deleting file from S3: " + e.getMessage());

	        }



	        // Delete the laptop from the database

	        airpodsRepo.deleteById(id);

	    }

	 

	 

	 

//   Watches insert update and delete

	 public Watches saveWatches(String name, Long cost, Long quantity, MultipartFile file , Double discount , String description) throws IOException {

	        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

	        try {

	            // Upload to S3

	            s3Client.putObject(

	                PutObjectRequest.builder()

	                    .bucket(bucketName)

	                    .key(fileName)

	                    .contentType("image/jpeg")

	                    .build(),

	                RequestBody.fromBytes(file.getBytes())

	            );

	        } catch (Exception e) {

	            throw new RuntimeException("Error uploading file to S3: " + e.getMessage());

	        }



	        //String fileUrl = String.format("https://%s.s3.%s.amazonaws.com/%s", bucketName, Region.US_EAST_1.id(), fileName);



	        String fileUrl = String.format("https://%s.s3.%s.amazonaws.com/%s", bucketName, Region.EU_NORTH_1.id(), fileName);

	        System.out.println("File uploaded successfully. File URL: " + fileUrl);



	        

	        try {

	            // Save to database

	            Watches watches=new Watches();

	            watches.setName(name);

	            watches.setCost(cost);

	            watches.setImage(fileUrl);

	            watches.setQuantity(quantity);

	            watches.setDescription(description);

	            watches.setDiscount(discount);

	            System.out.println("Saving Watches: pname=" + name + ", pcost=" + cost + ", pimage=" + fileUrl);



	            return watchesRepo.save(watches);

	        } catch (Exception e) {

	            throw new RuntimeException("Error saving Watches to database: " + e.getMessage());

	        }

	    }

	 

	 public Watches updateWatches(Long id, String name, Long cost, Long quantity, MultipartFile file, Double discount , String description) throws IOException {

	        Watches existingWatches = watchesRepo.findById(id)

	                .orElseThrow(() -> new IllegalArgumentException("Watches not found"));



	        // Update fields if provided

	        if (name != null && !name.isEmpty()) {

	        	existingWatches.setName(name);

	        }

	        if (cost != null && cost > 0) {

	        	existingWatches.setCost(cost);

	        }

	        if (quantity != null && quantity > 0) {

	        	existingWatches.setQuantity(quantity);

	        }

	        

	        if (discount !=null && discount>0) {

	        	existingWatches.setDiscount(discount);

	        }





	        // Handle file update if a new file is provided

	        if (file != null && !file.isEmpty()) {

	            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

	            try {

	                s3Client.putObject(

	                    PutObjectRequest.builder()

	                        .bucket(bucketName)

	                        .key(fileName)

	                        .contentType(file.getContentType())

	                        .build(),

	                    RequestBody.fromBytes(file.getBytes())

	                );

	            } catch (Exception e) {

	                throw new RuntimeException("Error uploading new file to S3: " + e.getMessage());

	            }



	            String fileUrl = String.format("https://%s.s3.%s.amazonaws.com/%s", bucketName, Region.EU_NORTH_1.id(), fileName);

	            existingWatches.setImage(fileUrl);

	        }



	        return watchesRepo.save(existingWatches);

	    }

	

	 

	 public void deleteWatches(Long id) {

	        // Fetch the laptop from the database

	        Watches watches = watchesRepo.findById(id)

	                .orElseThrow(() -> new RuntimeException("Watches not found"));



	        String fileUrl = watches.getImage();

	        String fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);



	        // Delete the file from S3

	        try {

	            s3Client.deleteObject(

	                DeleteObjectRequest.builder()

	                    .bucket(bucketName)

	                    .key(fileName)

	                    .build()

	            );

	        } catch (Exception e) {

	            throw new RuntimeException("Error deleting file from S3: " + e.getMessage());

	        }



	        // Delete the laptop from the database

	        watchesRepo.deleteById(id);

	    }
	 
	 
	 
	 

//   Homeapp insert update and delete
	 public Homeapp saveHomeapp(String name, Long cost, Long quantity, MultipartFile file , Double discount , String description) throws IOException {

	        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

	        try {

	            // Upload to S3

	            s3Client.putObject(

	                PutObjectRequest.builder()

	                    .bucket(bucketName)

	                    .key(fileName)

	                    .contentType("image/jpeg")

	                    .build(),

	                RequestBody.fromBytes(file.getBytes())

	            );

	        } catch (Exception e) {

	            throw new RuntimeException("Error uploading file to S3: " + e.getMessage());

	        }



	        //String fileUrl = String.format("https://%s.s3.%s.amazonaws.com/%s", bucketName, Region.US_EAST_1.id(), fileName);



	        String fileUrl = String.format("https://%s.s3.%s.amazonaws.com/%s", bucketName, Region.EU_NORTH_1.id(), fileName);

	        System.out.println("File uploaded successfully. File URL: " + fileUrl);



	        

	        try {

	            // Save to database

	           Homeapp homeapp=new Homeapp();

	           homeapp.setName(name);

	           homeapp.setCost(cost);

	           homeapp.setImage(fileUrl);

	           homeapp.setQuantity(quantity);

	           homeapp.setDescription(description);

	           homeapp.setDiscount(discount);

	            System.out.println("Saving Watches: pname=" + name + ", pcost=" + cost + ", pimage=" + fileUrl);



	            return homeappRepo.save(homeapp);

	        } catch (Exception e) {

	            throw new RuntimeException("Error saving Homeapp to database: " + e.getMessage());

	        }

	    }

	 

	 public Homeapp updateHomeapp(Long id, String name, Long cost, Long quantity, MultipartFile file, Double discount , String description) throws IOException {

	        Homeapp existingHomeapp = homeappRepo.findById(id)

	                .orElseThrow(() -> new IllegalArgumentException("Homeapp not found"));



	        // Update fields if provided

	        if (name != null && !name.isEmpty()) {

	        	existingHomeapp.setName(name);

	        }

	        if (cost != null && cost > 0) {

	        	existingHomeapp.setCost(cost);

	        }

	        if (quantity != null && quantity > 0) {

	        	existingHomeapp.setQuantity(quantity);

	        }

	        if (discount !=null && discount>0) {

	        	existingHomeapp.setDiscount(discount);

	        }





	        // Handle file update if a new file is provided

	        if (file != null && !file.isEmpty()) {

	            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

	            try {

	                s3Client.putObject(

	                    PutObjectRequest.builder()

	                        .bucket(bucketName)

	                        .key(fileName)

	                        .contentType(file.getContentType())

	                        .build(),

	                    RequestBody.fromBytes(file.getBytes())

	                );

	            } catch (Exception e) {

	                throw new RuntimeException("Error uploading new file to S3: " + e.getMessage());

	            }



	            String fileUrl = String.format("https://%s.s3.%s.amazonaws.com/%s", bucketName, Region.EU_NORTH_1.id(), fileName);	

	            existingHomeapp.setImage(fileUrl);

	        }



	        return homeappRepo.save(existingHomeapp);

	    }

	

	 

	 public void deleteHomeapp(Long id) {

	        // Fetch the laptop from the database

	        Homeapp homeapp = homeappRepo.findById(id)

	                .orElseThrow(() -> new RuntimeException("homeapp not found"));



	        String fileUrl = homeapp.getImage();

	        String fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);



	        // Delete the file from S3

	        try {

	            s3Client.deleteObject(

	                DeleteObjectRequest.builder()

	                    .bucket(bucketName)

	                    .key(fileName)

	                    .build()

	            );

	        } catch (Exception e) {

	            throw new RuntimeException("Error deleting file from S3: " + e.getMessage());

	        }

	        // Delete the laptop from the database
	        homeappRepo.deleteById(id);

	    }

	 

	 

	 

	 

	 

	 

	 

	

	
}
