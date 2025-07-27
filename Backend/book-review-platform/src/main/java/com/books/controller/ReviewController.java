package com.books.controller;

import com.books.DTO.ReviewRequest;
import com.books.entity.UserReview;
import com.books.repository.ReviewRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    @PostMapping
    public String addReview(@RequestBody ReviewRequest reviewDTO) {
        UserReview review = new UserReview();
        review.setBookId(reviewDTO.getBookId());
        review.setTitle(reviewDTO.getTitle());
        review.setAuthor(reviewDTO.getAuthor());
        review.setGenre(reviewDTO.getGenre());
        review.setRating(reviewDTO.getRating());
        review.setReviewText(reviewDTO.getReviewText());
        review.setUserEmail(reviewDTO.getUserEmail());

        reviewRepository.save(review);
        return "Review submitted successfully!";
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<List<UserReview>> getReviewsByUser(@PathVariable String email) {
        List<UserReview> reviews = reviewRepository.findByUserEmail(email);
        System.out.println(reviews);
        return ResponseEntity.ok(reviews);
    }
}
