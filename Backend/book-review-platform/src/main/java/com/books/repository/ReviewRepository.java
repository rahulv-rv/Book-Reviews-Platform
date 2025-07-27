package com.books.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.books.entity.UserReview;

public interface ReviewRepository extends JpaRepository<UserReview, Long>
{
	List<UserReview> findByUserEmail(String email);
}
