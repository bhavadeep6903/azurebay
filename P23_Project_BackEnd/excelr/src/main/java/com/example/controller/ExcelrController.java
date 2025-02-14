package com.example.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.model.Airpods;
import com.example.model.Homeapp;
import com.example.model.Ipads;
import com.example.model.Laptops;
import com.example.model.Login;
import com.example.model.Mobiles;
import com.example.model.Search;
import com.example.model.Watches;
import com.example.repo.LoginRepo;
import com.example.service.ExcelrService;
import com.example.util.JwtUtil;


@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class ExcelrController {
	
	
	@Autowired
    private LoginRepo loginRepo; 
	
	@Autowired
	private ExcelrService excelrService;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	
	@GetMapping("/search") 
	public List<Search> searchProducts(@RequestParam String keyword) { 
		return excelrService.findProductsByKeyword(keyword); 	
	}
     
	
	//login
	
	@PostMapping("/login")
	public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> loginData){
		String username = loginData.get("username");
		String password = loginData.get("password");
		
		Optional<Login> login = loginRepo.findByUsername(username);
		
		if (login.isPresent() && login.get().getPassword().equals(password)) {
			
			String token = jwtUtil.generateToken(username);
			
			Map<String, String> response = new HashMap<>(); 
			response.put("login", "success");
			response.put("token", token);
			
			response.put("role", login.get().getRole());
			response.put("username",login.get().getUsername());
			return ResponseEntity.ok(response);
		}
		
		Map<String, String> response = new HashMap<>();
		response.put("login", "fail");
		return ResponseEntity.status(401).body(response);
	}
	
	@GetMapping("user/details/{data}")
	public ResponseEntity<?> userdetails(@PathVariable String data){
		Optional<Login> login = loginRepo.findByUsername(data);
		return ResponseEntity.ok(login);
	}
	
	@GetMapping("admin/logindata")
	public List<Login> getLogin(){
		
		return loginRepo.findAll();
	}
	
	
	
	@PostMapping("/admin/upload/register")
    public Login register1(@RequestBody Login login) {
    	return excelrService.saveUser(login);
    }
 
 
 @PutMapping("/admin/update/login")
 public ResponseEntity<?> updateLogin(@RequestBody Login updatedLogin) {
     if (updatedLogin.getId() == 0) {
         return ResponseEntity.badRequest().body("Login ID is required.");
     }

     Optional<Login> login = excelrService.updateLogin(updatedLogin.getId(), updatedLogin);

     if (login.isPresent()) {
         return ResponseEntity.ok(login.get());
     } else {
         return ResponseEntity.status(404).body("Login not found.");
     }
 }

 @DeleteMapping("/admin/delete/login/{id}")
    public ResponseEntity<?> deleteLogin(@PathVariable Integer id) {
        try {
            excelrService.deleteLogin(id);
            return ResponseEntity.ok("Login deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting laptop: " + e.getMessage());
        }
    }
	
	
	 //Register
	
    @PostMapping("/guest/register")
    public Login register(@RequestBody Login login) {
    	return excelrService.saveUser(login);
    }
    
    
    //all products
    @GetMapping("/guest/laptops")
    public List<Laptops> getLaptops(){
    	return excelrService.findAllLaptops();
    }
    
    @GetMapping("/guest/mobiles")
    public List<Mobiles> getMobiles(){
    	return excelrService.findAllMobiles();
    }
    
    @GetMapping("/guest/ipads")
    public List<Ipads> getIpads(){
    	return excelrService.findAllIpads();
    }
    
    @GetMapping("/guest/watches")
    public List<Watches> getWatches(){
    	return excelrService.findAllWatches();
    }
    
    @GetMapping("/guest/airpods")
    public List<Airpods> getAirpods(){
    	return excelrService.findAllAirpods();
    }
    
    @GetMapping("/guest/homeapp")
    public List<Homeapp> getHomeapp(){
    	return excelrService.findAllHomeapp();
    }
    
    
    //all products
    @GetMapping("/user/laptops")
    public List<Laptops> getUserLaptops(){
    	return excelrService.findAllLaptops();
    }
    
    @GetMapping("/user/mobiles")
    public List<Mobiles> getUserMobiles(){
    	return excelrService.findAllMobiles();
    }
    
    @GetMapping("/user/ipads")
    public List<Ipads> getUserIpads(){
    	return excelrService.findAllIpads();
    }
    
    @GetMapping("/user/watches")
    public List<Watches> getUserWatches(){
    	return excelrService.findAllWatches();
    }
    
    @GetMapping("/user/airpods")
    public List<Airpods> getUserAirpods(){
    	return excelrService.findAllAirpods();
    }
    
    @GetMapping("/user/homeapp")
    public List<Homeapp> getUserHomeapp(){
    	return excelrService.findAllHomeapp();
    }
    
    
    
    
    //all admin products
    @GetMapping("/admin/laptops")
    public List<Laptops> getAdminLaptops(){
    	return excelrService.findAllLaptops();
    }
    
    @GetMapping("/admin/mobiles")
    public List<Mobiles> getAdminMobiles(){
    	return excelrService.findAllMobiles();
    }
    
    @GetMapping("/admin/ipads")
    public List<Ipads> getAdminIpads(){
    	return excelrService.findAllIpads();
    }
    
    @GetMapping("/admin/watches")
    public List<Watches> getAdminWatches(){
    	return excelrService.findAllWatches();
    }
    
    @GetMapping("/admin/airpods")
    public List<Airpods> getAdminAirpods(){
    	return excelrService.findAllAirpods();
    }
    
    @GetMapping("/admin/homeapp")
    public List<Homeapp> getAdminHomeapp(){
    	return excelrService.findAllHomeapp();
    }
    
    
    
    //uploadlaptops
    @PostMapping("/admin/upload/laptops")
    public ResponseEntity<?> uploadLaptops(
            @RequestParam String name,
            @RequestParam Long cost,
            @RequestParam Double discount,
            @RequestParam MultipartFile file,
            @RequestParam Long quantity,
            @RequestParam String description) {

        if (name == null || name.isEmpty() || cost <= 0 || file == null || file.isEmpty() || quantity <= 0 || (discount != null && discount <= 0)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Input parameter");
        } else {
            Laptops savedLaptops = null;
            try {
                savedLaptops = excelrService.saveLaptop(name, cost, quantity, file, discount, description);
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving laptop: " + e.getMessage());
            } // Catch specific exceptions as needed
            return ResponseEntity.ok(savedLaptops);
        }
    }
    
    
    //delete laptop
    
    @DeleteMapping("/admin/delete/laptops/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        try {
            excelrService.deleteLaptops(id);
            return ResponseEntity.ok("Mobile deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting laptop: " + e.getMessage());
        }
    }
    
    
    @PutMapping("/admin/update/laptops")
    public ResponseEntity<?> updateLaptop(@RequestParam Long id,
                                          @RequestParam(required = false) String name,
                                          @RequestParam(required = false) Long cost,
                                          @RequestParam(required = false) Long quantity,
                                          @RequestParam(required = false) MultipartFile file,
                                          @RequestParam(required = false) Long discount,
                                          @RequestParam(required = false) String description) {
        if (id == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Laptop ID is required for updating");
        }

        try {
            Laptops updatedLaptop = excelrService.updateLaptop(id, name, cost, quantity, file, discount,description);
            return ResponseEntity.ok(updatedLaptop);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    
    
    
    //Mobiles
	@PostMapping("/admin/upload/mobiles")
	public ResponseEntity<?> uploadMobiles( @RequestParam String name,
            @RequestParam Long cost,
            @RequestParam(required = false) Double discount,
            @RequestParam MultipartFile file,
            @RequestParam Long quantity,
            @RequestParam String description) {

        if (name == null || name.isEmpty() || cost <= 0 || file == null || file.isEmpty() || quantity <= 0 || (discount != null && discount <= 0)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Input parameter");
        } else {
            Mobiles savedMobiles = null;
            try {
                savedMobiles = excelrService.saveMobiles(name, cost, quantity, file, discount, description);
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving Mobiles: " + e.getMessage());
            } // Catch specific exceptions as needed
            return ResponseEntity.ok(savedMobiles);
        }
    }
	
	
	
	
	 @PutMapping("/admin/update/mobiles")
	    public ResponseEntity<?> updateMobiles(@RequestParam Long id,
	                                          @RequestParam(required = false) String name,
	                                          @RequestParam(required = false) Long cost,
	                                          @RequestParam(required = false) Long quantity,
	                                          @RequestParam(required = false) MultipartFile file,
	                                          @RequestParam(required = false) Double discount,
	                                          @RequestParam(required = false) String description) {
	        if (id == null) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Laptop ID is required for updating");
	        }

	        try {
	            Mobiles updateMobiles = excelrService.updateMobiles(id, name, cost, quantity, file, discount, description);
	            return ResponseEntity.ok(updateMobiles);
	        } catch (IllegalArgumentException e) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
	        } catch (RuntimeException e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
	        }
	    }

	    
	    @DeleteMapping("/admin/delete/mobiles/{id}")
	    public ResponseEntity<?> deleteMobiles(@PathVariable Long id) {
	        try {
	            excelrService.deleteMobiles(id);
	            return ResponseEntity.ok("mobiles deleted successfully");
	        } catch (RuntimeException e) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting mobiles: " + e.getMessage());
	        }
	    }
	
	
	  //ipads
		@PostMapping("/admin/upload/ipads")
		public ResponseEntity<?> uploadIpads( @RequestParam String name,
	            @RequestParam Long cost,
	            @RequestParam(required = false) Double discount,
	            @RequestParam MultipartFile file,
	            @RequestParam Long quantity,
	            @RequestParam String description) {

	        if (name == null || name.isEmpty() || cost <= 0 || file == null || file.isEmpty() || quantity <= 0 || (discount != null && discount <= 0)) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Input parameter");
	        } else {
	            Ipads savedIpads = null;
	            try {
	            	savedIpads = excelrService.saveIpads(name, cost, quantity, file, discount, description);
	            } catch (Exception e) {
	                e.printStackTrace();
	                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving Ipads: " + e.getMessage());
	            } // Catch specific exceptions as needed
	            return ResponseEntity.ok(savedIpads);
	        }
	    }
		
		
		
		
		
		
		 @PutMapping("/admin/update/ipads")
		    public ResponseEntity<?> updateIpads(@RequestParam Long id,
		                                          @RequestParam(required = false) String name,
		                                          @RequestParam(required = false) Long cost,
		                                          @RequestParam(required = false) Long quantity,
		                                          @RequestParam(required = false) MultipartFile file,
		                                          @RequestParam(required = false) Double discount,
		                                          @RequestParam(required = false) String description) {
		        if (id == null) {
		            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Ipads ID is required for updating");
		        }

		        try {
		            Ipads updateIpads = excelrService.updateIpads(id, name, cost, quantity, file, discount, description);
		            return ResponseEntity.ok(updateIpads);
		        } catch (IllegalArgumentException e) {
		            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		        } catch (RuntimeException e) {
		            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		        }
		    }

		    
		    @DeleteMapping("/admin/delete/ipads/{id}")
		    public ResponseEntity<?> deleteIpads(@PathVariable Long id) {
		        try {
		            excelrService.deleteIpads(id);
		            return ResponseEntity.ok("mobiles deleted successfully");
		        } catch (RuntimeException e) {
		            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		        } catch (Exception e) {
		            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting mobiles: " + e.getMessage());
		        }
		    }
		
		
		
		    
		    
		    
		    
		    
		    //airpods
		@PostMapping("/admin/upload/airpods")
		public ResponseEntity<?> uploadAirpods( @RequestParam String name,
	            @RequestParam Long cost,
	            @RequestParam(required = false) Double discount,
	            @RequestParam MultipartFile file,
	            @RequestParam Long quantity,
	            @RequestParam String description) {

	        if (name == null || name.isEmpty() || cost <= 0 || file == null || file.isEmpty() || quantity <= 0 || (discount != null && discount <= 0)) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Input parameter");
	        } else {
	            Airpods savedAirpods = null;
	            try {
	            	savedAirpods = excelrService.saveAirpods(name, cost, quantity, file, discount, description);
	            	
	            } catch (Exception e) {
	                e.printStackTrace();
	                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving Ipads: " + e.getMessage());
	            } // Catch specific exceptions as needed
	            return ResponseEntity.ok(savedAirpods);
	        }
	    }
		
		
		
		
		 @PutMapping("/admin/update/airpods")
		    public ResponseEntity<?> updateAirpods(@RequestParam Long id,
		                                          @RequestParam(required = false) String name,
		                                          @RequestParam(required = false) Long cost,
		                                          @RequestParam(required = false) Long quantity,
		                                          @RequestParam(required = false) MultipartFile file,
		                                          @RequestParam(required = false) Double discount,
		                                          @RequestParam(required = false) String description) {
		        if (id == null) {
		            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Airpods ID is required for updating");
		        }

		        try {
		            Airpods updateAirpods = excelrService.updateAirpods(id, name, cost, quantity, file, discount, description);
		            return ResponseEntity.ok(updateAirpods);
		        } catch (IllegalArgumentException e) {
		            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		        } catch (RuntimeException e) {
		            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		        }
		    }

		    
		    @DeleteMapping("/admin/delete/airpods/{id}")
		    public ResponseEntity<?> deleteAirpods(@PathVariable Long id) {
		        try {
		            excelrService.deleteAirpods(id);
		            return ResponseEntity.ok("airpods deleted successfully");
		        } catch (RuntimeException e) {
		            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		        } catch (Exception e) {
		            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting airpods: " + e.getMessage());
		        }
		    }
		
		
		
		    
		    
		    
		    //watches
		
		@PostMapping("/admin/upload/watches")
		public ResponseEntity<?> uploadWatches( @RequestParam String name,
	            @RequestParam Long cost,
	            @RequestParam(required = false) Double discount,
	            @RequestParam MultipartFile file,
	            @RequestParam Long quantity,
	            @RequestParam String description) {

	        if (name == null || name.isEmpty() || cost <= 0 || file == null || file.isEmpty() || quantity <= 0 || (discount != null && discount <= 0)) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Input parameter");
	        } else {
	            Watches savedWatches = null;
	            try {
	            	savedWatches = excelrService.saveWatches(name, cost, quantity, file, discount, description);
	            } catch (Exception e) {
	                e.printStackTrace();
	                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving Ipads: " + e.getMessage());
	            } // Catch specific exceptions as needed
	            return ResponseEntity.ok(savedWatches);
	        }
	    }
		
		
		
		
		 @PutMapping("/admin/update/watches")
		    public ResponseEntity<?> updateWatches(@RequestParam Long id,
		                                          @RequestParam(required = false) String name,
		                                          @RequestParam(required = false) Long cost,
		                                          @RequestParam(required = false) Long quantity,
		                                          @RequestParam(required = false) MultipartFile file,
		                                          @RequestParam(required = false) Double discount,
		                                          @RequestParam(required = false) String description) {
		        if (id == null) {
		            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Watches ID is required for updating");
		        }

		        try {
		            Watches updateWatches = excelrService.updateWatches(id, name, cost, quantity, file, discount, description);
		            return ResponseEntity.ok(updateWatches);
		        } catch (IllegalArgumentException e) {
		            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		        } catch (RuntimeException e) {
		            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		        }
		    }

		    
		    @DeleteMapping("/admin/delete/watches/{id}")
		    public ResponseEntity<?> deleteWatches(@PathVariable Long id) {
		        try {
		            excelrService.deleteWatches(id);
		            return ResponseEntity.ok("watches deleted successfully");
		        } catch (RuntimeException e) {
		            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		        } catch (Exception e) {
		            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting watches: " + e.getMessage());
		        }
		    }
		
		
		
		
		
		
		
		//homeapp
		    
		@PostMapping("/admin/upload/homeapp")
		public ResponseEntity<?> uploadHomeapp( @RequestParam String name,
	            @RequestParam Long cost,
	            @RequestParam(required = false) Double discount,
	            @RequestParam MultipartFile file,
	            @RequestParam Long quantity,
	            @RequestParam String description) {

	        if (name == null || name.isEmpty() || cost <= 0 || file == null || file.isEmpty() || quantity <= 0 || (discount != null && discount <= 0)) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Input parameter");
	        } else {
	            Homeapp savedHomeapp = null;
	            try {
	                savedHomeapp = excelrService.saveHomeapp(name, cost, quantity, file, discount, description);
	            } catch (Exception e) {
	                e.printStackTrace();
	                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving Mobiles: " + e.getMessage());
	            } // Catch specific exceptions as needed
	            return ResponseEntity.ok(savedHomeapp);
	        }
	    }
		
		
		
		 @PutMapping("/admin/update/homeapp")
		    public ResponseEntity<?> updateHomeapp(@RequestParam Long id,
		                                          @RequestParam(required = false) String name,
		                                          @RequestParam(required = false) Long cost,
		                                          @RequestParam(required = false) Long quantity,
		                                          @RequestParam(required = false) MultipartFile file,
		                                          @RequestParam(required = false) Double discount,
		                                          @RequestParam(required = false) String description) {
		        if (id == null) {
		            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Homeapp ID is required for updating");
		        }

		        try {
		            Homeapp updateHomeapp = excelrService.updateHomeapp(id, name, cost, quantity, file, discount, description);
		            return ResponseEntity.ok(updateHomeapp);
		        } catch (IllegalArgumentException e) {
		            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		        } catch (RuntimeException e) {
		            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		        }
		    }

		    
		    @DeleteMapping("/admin/delete/homeapp/{id}")
		    public ResponseEntity<?> deleteHomeapp(@PathVariable Long id) {
		        try {
		            excelrService.deleteHomeapp(id);
		            return ResponseEntity.ok("Homeapp deleted successfully");
		        } catch (RuntimeException e) {
		            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		        } catch (Exception e) {
		            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting Homeapp: " + e.getMessage());
		        }
		    }
		
		    /*
			 * razorpay
			 */
			@PostMapping("/create-order")
		    public ResponseEntity<?> createOrder(@RequestBody Map<String, Object> data) {
		        try {
		            int amount = (int) data.get("amount");
		            String currency = (String) data.get("currency");
		            String receipt = (String) data.get("receipt");

		            String order = excelrService.createOrder(amount, currency, receipt);
		            return ResponseEntity.ok(order);
		        } catch (Exception e) {
		            return ResponseEntity.badRequest().body("Failed to create order");
		        }
		    }
			@PostMapping("/verify-payment")
		    public ResponseEntity<?> verifyPayment(@RequestBody Map<String, String> data) {
		        String orderId = data.get("razorpay_order_id");
		        String paymentId = data.get("razorpay_payment_id");
		        String signature = data.get("razorpay_signature");

		        boolean isValid = excelrService.verifyPayment(orderId, paymentId, signature);

		        if (isValid) {
		            return ResponseEntity.ok("Payment Verified");
		        } else {
		            return ResponseEntity.badRequest().body("Payment Verification Failed");
		        }
		    }

		


}
