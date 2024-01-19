package com.chapp.med_ease.cart;

import java.util.ArrayList;
import java.util.List;

import com.chapp.med_ease.user.User;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Cart {

    @Id
    @Column(name = "id")
    private int id;

    @OneToOne(cascade = { CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH })
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "cart_item_id")
    private List<CartItem> cartItems;

    @Column(name = "total_cost")
    private int totalCost;

    public void addCartItem(CartItem cartItem) {
        if (cartItems == null) {
            cartItems = new ArrayList<>();
        } else {
            cartItems.add(cartItem);
        }

        cartItem.setCart(this);
    }

}
