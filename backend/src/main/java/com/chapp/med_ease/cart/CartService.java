package com.chapp.med_ease.cart;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.chapp.med_ease.cart.cart_dto.CartItemResponse;
import com.chapp.med_ease.cart.cart_dto.CartProduct;
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
            System.out.println("Cart is null");
            final Cart newCart = Cart.builder()
                    .user(user)
                    .build();
            cartRepository.save(newCart);
            user.setCart(newCart);
            cart = newCart;
        }
        System.out.println("Cart is not null");

        final List<CartItem> cartItems = cart.getCartItems();

        if (cartItems == null) { // if cart is empty
            System.out.println("Cart items is null");
            final CartItem newCartItem = CartItem.builder()
                    .medicine(medicine)
                    .quantity(req.getQuantity())
                    .cost(medicine.getCostPerMonth())
                    .totalCost(medicine.getCostPerMonth() * req.getQuantity())
                    .build();
            cart.addCartItem(newCartItem);
            cartRepository.save(cart);
            cartItemRepository.save(newCartItem);
        }

        else {
            System.out.println("Cart items is not null");

            Optional<CartItem> cartItem = cartItemRepository.findByMedicine(medicine);

            if (cartItem.isPresent()) { // if medicine already exists in cart
                System.out.println("Medicine already exists in cart");
                cartItem.get().setQuantity(req.getQuantity());
                cartItem.get().setCost(medicine.getCostPerMonth());
                int prevTotalCost = cartItem.get().getTotalCost();
                int newTotalCost = medicine.getCostPerMonth() * req.getQuantity();
                cart.setTotalCost(cart.getTotalCost() - prevTotalCost + newTotalCost);
                cartItem.get().setTotalCost(newTotalCost);
                cartItemRepository.save(cartItem.get());
            }

            else { // if medicine doesnt exist in cart
                System.out.println("Medicine doesnt exist in cart");
                final CartItem newCartItem = CartItem.builder()
                        .medicine(medicine)
                        .quantity(req.getQuantity())
                        .cost(medicine.getCostPerMonth())
                        .totalCost(medicine.getCostPerMonth() * req.getQuantity())
                        .build();
                cart.addCartItem(newCartItem);
                cartRepository.save(cart);
                cartItemRepository.save(newCartItem);

            }

        }

    }

    public List<CartItemResponse> getCartItems(int userId) throws BadRequestException {

        final User user = userRepository.findById(userId)
                .orElseThrow(() -> new BadRequestException("User not found"));

        final Cart cart = user.getCart();

        List<CartItemResponse> res = new ArrayList<>();

        if (cart == null) {
            return res;
        }

        final List<CartItem> cartItems = cart.getCartItems();

        if (cartItems == null) {
            return res;
        }

        for (CartItem cartItem : cartItems) {

            Medicine medicine = cartItem.getMedicine();

            CartProduct cartProduct = new CartProduct(medicine);
            CartItemResponse cartItemResponse = CartItemResponse.builder()
                    .id(cartItem.getId())
                    .quantity(cartItem.getQuantity())
                    .totalCost(cartItem.getTotalCost())
                    .build();

            res.add(cartItemResponse);
        }

        return res;

    }

}
