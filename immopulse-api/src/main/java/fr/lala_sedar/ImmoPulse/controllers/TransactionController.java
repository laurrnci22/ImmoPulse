package fr.lala_sedar.ImmoPulse.controllers;

import fr.lala_sedar.ImmoPulse.controllers.dto.out.TransactionDTO;
import fr.lala_sedar.ImmoPulse.domain.mapper.TransactionMapper;
import fr.lala_sedar.ImmoPulse.domain.service.TransactionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@Slf4j
@RestController
@RequestMapping("/api/transaction")
@RequiredArgsConstructor
public class TransactionController {
    private final TransactionService transactionService;
/*
    @GetMapping("")
    public ResponseEntity<Collection<TransactionDTO>> getAllTransactions(
            @RequestParam(required = false) Collection<String> authorNames
    ) {
        log.info("Fetching articles for authors: {}", authorNames);
        return fetchArticles(authorNames);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransactionDTO> getTransactionById(@PathVariable String id) {
        log.info("Fetching article with id: {}", id);
        return transactionService.findArticleById(id)
                .map(TransactionMapper::toDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }*/
}
