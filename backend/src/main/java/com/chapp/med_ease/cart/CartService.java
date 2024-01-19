package com.chapp.med_ease.cart;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.chapp.med_ease.cart.cart_dto.CartRequest;
import com.chapp.med_ease.exception.exceptions.BadRequestException;
import com.chapp.med_ease.medicine.Medicine;
import com.chapp.med_ease.medicine.MedicineRepository;
import com.chapp.med_ease.user.User;
import com.chapp.med_ease.user.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartService {

    private final UserRepository userRepository;
    private final CartRespository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final MedicineRepository medicineRepository;

    public void addProductToCart(CartRequest req) throws BadRequestException {

        final User user = userRepository.findById(req.getUserId())
                .orElseThrow(() -> new BadRequestException("User not found"));

        final Medicine medicine = medicineRepository.findById(req.getMedicineId())
                .orElseThrow(() -> new BadRequestException("Medicine not found"));

        Cart cart = user.getCart();

        if (cart == null) {
            final Cart newCart = Cart.builder()
                    .user(user)
                    .build();
            cartRepository.save(newCart);
            cart = newCart;

        }

        final List<CartItem> cartItems = cart.getCartItems();

        if (cartItems == null) { // if cart is empty
            final CartItem newCartItem = CartItem.builder()
                    .medicine(medicine)
                    .quantity(req.getQuantity())
                    .cost(req.getCostPerMonth())
                    .build();
            cart.addCartItem(newCartItem);
            cartRepository.save(cart);
            cartItemRepository.save(newCartItem);
        }

        else {

            Optional<CartItem> cartItem = cartItemRepository.findByMedicine(medicine);

            if (cartItem.isPresent()) { // if medicine already exists in cart
                cartItem.get().setQuantity(req.getQuantity());
                cartItem.get().setCost(req.getCostPerMonth());
                cartItemRepository.save(cartItem.get());
            }

            else { // if medicine doesnt exist in cart
                final CartItem newCartItem = CartItem.builder()
                        .medicine(medicine)
                        .quantity(req.getQuantity())
                        .cost(req.getCostPerMonth())
                        .build();
                cart.addCartItem(newCartItem);
                cartRepository.save(cart);
                cartItemRepository.save(newCartItem);
            }

        }

    }

}
