package fr.lala_sedar.ImmoPulse.infra.entity;

import fr.lala_sedar.ImmoPulse.infra.entity.enums.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@Entity
@Table(name = "users")
public class UserEntity  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;


    @ManyToMany
    @JoinTable(
            name = "user_wishlist",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "land_transaction_id")
    )
    private List<LandTransactionEntity> wishlist = new ArrayList<>();

    public void addToWishlist(LandTransactionEntity transaction) {
        this.wishlist.add(transaction);
    }

    public void removeFromWishlist(LandTransactionEntity transaction) {
        this.wishlist.remove(transaction);
    }

}
