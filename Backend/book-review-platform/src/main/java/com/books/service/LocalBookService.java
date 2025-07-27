package com.books.service;

import com.books.entity.LocalBook;
import com.books.repository.LocalBookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocalBookService {

    @Autowired
    private LocalBookRepository bookRepository;

    public LocalBook saveBook(LocalBook book) {
        return bookRepository.save(book);
    }

    public List<LocalBook> getBooksByUser(String email) {
        return bookRepository.findByUserEmail(email);
    }

    public List<LocalBook> getAllLocalBooks() {
        return bookRepository.findAll();
    }
}
