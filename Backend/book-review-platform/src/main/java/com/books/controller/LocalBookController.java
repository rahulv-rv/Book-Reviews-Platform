package com.books.controller;

import com.books.entity.LocalBook;
import com.books.service.LocalBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "*")
public class LocalBookController {

    @Autowired
    private LocalBookService bookService;

    // Add new book
    @PostMapping
    public LocalBook addBook(@RequestBody LocalBook book) {
        return bookService.saveBook(book);
    }

    // Get books by user
    @GetMapping("/user/{email}")
    public List<LocalBook> getBooksByUser(@PathVariable String email) {
        return bookService.getBooksByUser(email);
    }

    // Get all local books (optional, for admin or testing)
    @GetMapping("/all")
    public List<LocalBook> getAllBooks() {
        return bookService.getAllLocalBooks();
    }
}
