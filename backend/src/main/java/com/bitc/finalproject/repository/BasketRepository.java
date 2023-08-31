package com.bitc.finalproject.repository;

import com.bitc.finalproject.entity.BasketEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BasketRepository  extends JpaRepository<BasketEntity, Integer> {
    List<BasketEntity> findByBasketMemberId(String basketMemberId);

//   장바구니에서
    List<BasketEntity> findAllByBasketPkIn(List<Integer> list) throws Exception;

    BasketEntity findByBasketMemberIdAndBasketBookIdAndBasketBookPrice(String userId, String bookId, int indivPrice) throws Exception;
}
