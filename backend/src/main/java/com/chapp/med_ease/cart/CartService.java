package com.chapp.med_ease.cart;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.chapp.med_ease.cart.cart_dto.CartItemResponse;
import com.chapp.med_ease.cart.cart_dto.CartProduct;
import com.chapp.med_ease.cart.cart_dto.CartRequest;
import com.chapp.med_ease.exception.exceptions.BadRequestException;
import com.chapp.med_ease.exception.exceptions.NotAuthorizedException;
import com.chapp.med_ease.medicine.Medicine;
import com.chapp.med_ease.medicine.MedicineRepository;
import com.chapp.med_ease.order.Order;
import com.chapp.med_ease.order.OrderRespository;
import com.chapp.med_ease.user.User;
import com.chapp.med_ease.user.UserRepository;
import com.chapp.med_ease.util.UserFromToken;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartService {

    private final UserRepository userRepository;
    private final CartRespository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final MedicineRepository medicineRepository;
    private final OrderRespository orderRespository;
    private final UserFromToken userFromToken;

    public void addProductToCart(CartRequest req) throws BadRequestException {

        final User user = userFromToken.get();

        final Medicine medicine = medicineRepository.findById(req.getMedicineId())
                .orElseThrow(() -> new BadRequestException("Medicine not found"));

        Cart cart = user.getCart();

        if (cart == null) {
            System.out.println("Cart is null");
            final Cart newCart = Cart.builder()
                    .user(user)
                    .build();
            user.setCart(newCart);
            cart = newCart;
            cartRepository.save(cart);
            userRepository.save(user);
        }

        System.out.println("Cart is not null");

        Optional<CartItem> cartItem = cartItemRepository.findByCartAndMedicine(cart, medicine);

        if (cartItem.isPresent()) {
            System.out.println("Medicine already exists in cart");
            cartItem.get().setQuantity(req.getQuantity());
            cartItem.get().setCost(medicine.getCostPerMonth());
            int prevTotalCost = cartItem.get().getTotalCost();
            int newTotalCost = medicine.getCostPerMonth() * req.getQuantity();
            cart.setTotalCost(cart.getTotalCost() - prevTotalCost + newTotalCost);
            cartItem.get().setTotalCost(newTotalCost);
            cartItemRepository.save(cartItem.get());
        } else {
            System.out.println("Medicine doesnt exist in cart");
            final CartItem newCartItem = CartItem.builder()
                    .medicine(medicine)
                    .quantity(req.getQuantity())
                    .cost(medicine.getCostPerMonth())
                    .totalCost(medicine.getCostPerMonth() * req.getQuantity())
                    .build();
            cart.setTotalCost(cart.getTotalCost() + newCartItem.getTotalCost());
            cart.addCartItem(newCartItem);
            cartRepository.save(cart);
            cartItemRepository.save(newCartItem);
        }

    }

    public List<CartItemResponse> getCartItems() throws BadRequestException {

        final User user = userFromToken.get();

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
                    .cartProduct(cartProduct)
                    .build();

            res.add(cartItemResponse);
        }

        return res;

    }

    public void deleteCartItem(int id) throws BadRequestException {

        final User user = userFromToken.get();

        final Cart cart = user.getCart();

        if (cart == null)
            throw new BadRequestException("User doesnt have a cart");

        final CartItem cartItem = cartItemRepository.findByCartAndId(cart, id)
                .orElseThrow(() -> new BadRequestException("Cart item not found"));

        cart.removeCartItem(cartItem);

        cartRepository.save(cart);

        cartItemRepository.delete(cartItem);

    }

    public void deleteCart() throws BadRequestException {

        final User user = userFromToken.get();

        final Cart cart = user.getCart();

        if (cart == null)
            throw new BadRequestException("User doesnt have a cart");

        cartRepository.delete(cart);
        user.setCart(null);
        userRepository.save(user);

    }

}
