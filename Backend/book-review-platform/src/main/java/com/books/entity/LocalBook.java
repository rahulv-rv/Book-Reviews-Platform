package com.books.entity;

import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LocalBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String author;

    @Column(length = 1000)
    private String description;

    private List<String> genre; // comma-separated values
    private String publishedDate;
    private String thumbnail;
    private Double price;
    private String currency;
    private String language;

    // Optional fields
    private Integer pageCount;
    private String publisher;
    private String previewLink;
    private String isbn10;
    private String isbn13;
    private Double averageRating = 0.0;
    private Integer ratingsCount = 0;
    private Double discountPercentage;

    private String userEmail; // who added the book
}
