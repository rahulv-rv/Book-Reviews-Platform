package com.books.repository;

import com.books.entity.LocalBook;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LocalBookRepository extends JpaRepository<LocalBook, Long> {
    List<LocalBook> findByUserEmail(String email);
}
