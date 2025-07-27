package com.books.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewRequest 
{
	private String bookId;
    private String title;
    private String author;
    private String genre;
    private int rating;
    private String reviewText;
    private String userEmail;
}
