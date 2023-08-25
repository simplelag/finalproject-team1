package com.bitc.finalproject.controller;

import com.bitc.finalproject.entity.*;
import com.bitc.finalproject.repository.BoardRepository;
import com.bitc.finalproject.repository.BookInfoRepository;
import com.bitc.finalproject.repository.ReviewRepository;
import com.bitc.finalproject.service.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
public class MemberController {
    private final MemberService userService;
    private final BookInfoService bookInfoService;
    private final PurchaseService purchaseService;
    private final BoardService boardService;
    private final ReviewService reviewService;
    private final BookInfoRepository bookInfoRepository;
    private final BoardRepository boardRepository;
    private final ReviewRepository reviewRepository;

//    로그인 시
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public Object showLogin(
            @RequestParam("userId") String userId,
            @RequestParam("password") String password,
            HttpServletRequest req
    ) throws Exception{
        HttpSession session = req.getSession();
        Map<Object, Object> result = new HashMap<>();
        int correctId = userService.countMember(userId, password);
        if(correctId > 0){
            List<MemberEntity> memberEntities = userService.allMemberData(userId);
            session.setAttribute("id", userId);
            result.put("name", memberEntities.get(0).getMemberName());
            result.put("grade", memberEntities.get(0).getMemberAuthority());
        }
        result.put("login", correctId);
        return result;
    }

//    회원가입
//    아이디 중복 확인 버튼 클릭
    @RequestMapping(value = "/sign/idCheck", method = RequestMethod.GET)
    public boolean showCheckId(@RequestParam("userId") String userId) throws Exception{
        return userService.checkId(userId);
    }

//    이름이 존재하는지 확인
    @RequestMapping(value = "/sign/nameCheck", method = RequestMethod.GET)
    public boolean showCheckName(@RequestParam("name") String name) throws Exception{
        return userService.checkName(name);
    }

//    회원가입 버튼 클릭
//    회원정보 수정 - 회원 정보 변경 // 똑같이 수정이라서 가능함
    @RequestMapping(value = "/sign/signup", method = RequestMethod.POST)
    public void showSingUp(
            @RequestParam("userId") String userId,
            @RequestParam("password") String password,
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam("phone") String phone,
            @RequestParam("address") String address
    ) throws Exception{
        MemberEntity memberEntity = null;
        memberEntity = new MemberEntity(userId, password, name, email, phone, address);
        userService.saveMember(memberEntity);
    }

//    회원정보 수정 - 회원 정보 가져오기
    @RequestMapping(value = "/login/myLogin/myUserUpdate", method = RequestMethod.GET)
    public List<MemberEntity> showMemberDetail(@RequestParam("userId") String userId) throws Exception{
        return userService.allMemberData(userId);
    }

//    회원정보 수정 - 회원 탈퇴
    @RequestMapping(value = "/login/myLogin/withdraw", method = RequestMethod.DELETE)
    public int showWithDraw(
            @RequestParam("id") String userId,
            @RequestParam("password") String password
    ) throws Exception{
        MemberEntity memberEntity = new MemberEntity(userId, password);
        int correctId = userService.countMember(userId, password);
        if(correctId > 0){
            userService.memberWithDraw(memberEntity);
        }
        return correctId;
    }

//    마이페이지 - 구매 내역
    @RequestMapping(value = "/login/myLogin/myPurchaseList", method = RequestMethod.GET)
    public Object showMyPurchaseList(@RequestParam("userId") String userId, @RequestParam("state") int state, Pageable pageable) throws Exception{
        return purchaseService.myPurchaseList(userId, state, pageable);
    }

//    마이페이지 - 구매 취소
    @RequestMapping(value = "/login/myLogin/delete", method = RequestMethod.DELETE)
    public void showMyPurchaseCancel(@RequestBody PurchaseEntity purchaseEntity) throws Exception{
//        구매 취소 후 원래있던 판매 수량으로 되돌리기
        String bookId = purchaseEntity.getPurchaseBookId();
        String userId = purchaseEntity.getPurchaseBuyerId();
        String sellerId = purchaseEntity.getPurchaseSellerId();
        int bookPrice = purchaseEntity.getPurchasePayment();
        int BookNumber = purchaseEntity.getPurchaseNumber();
//        sale 테이블
        BookEntity book = bookInfoService.purchaseAfterMinusNumber(bookId, sellerId, bookPrice);
        book.setSaleBookPieces(book.getSaleBookPieces() + BookNumber);
        bookInfoService.bookInfoInsert(book);
//        Basket 테이블
        BasketEntity basketEntity = bookInfoService.purchaseBasketAfterMinusNumber(userId, bookId, bookPrice);
        if(basketEntity != null){
            basketEntity.setBasketBookPieces(basketEntity.getBasketBookPieces() + BookNumber);
            bookInfoService.basketInsert(basketEntity);
        }
        purchaseService.myPurchaseCancel(purchaseEntity);
    }

//    마이페이지 - 판매 내역
    @RequestMapping(value = "/login/myLogin/mySaleList", method = RequestMethod.GET)
    public Object showMySaleList(@RequestParam("userId") String userId, Pageable pageable) throws Exception{
        return bookInfoService.mySaleList(userId, pageable);
    }

//    마이페이지 - 판매 접수된 책을 배송하기 버튼 클릭 시 이벤트(현재는 한사람에게 책이 전부 팔렸을 때만)
    @RequestMapping(value="/login/myLogin/mySalePost", method = RequestMethod.PUT)
    public void showBookPost(@RequestBody BookEntity bookEntity) throws Exception {
        String bookId = bookEntity.getSaleBookId();
        String SellerId = bookEntity.getSaleSellerId();
        int bookPrice = bookEntity.getSaleBookPrice();
        int state = 1;
        List<PurchaseEntity> book = purchaseService.findPurchasedBook(bookId, SellerId, bookPrice, state);
        for (int i = 0; i < book.size(); i++) {
            PurchaseEntity book1 = book.get(i);
            book1.setPurchaseParcel(book.get(i).getPurchaseParcel() + 1);
            book1.setPurchasePostNumber("1");
            purchaseService.insertPurchaseList(book1);
        }
    }

    //    마이페이지 - 판매 내역개수
    @RequestMapping(value = "/login/myLogin/mySaleListCount", method = RequestMethod.GET)
    public int showMySaleListCount(@RequestParam("userId") String userId) throws Exception{
        return bookInfoRepository.countAllBySaleSellerId(userId);
    }

//    마이페이지 - 내가 쓴 리뷰
    @RequestMapping(value = "/login/myLogin/myReviewList", method = RequestMethod.GET)
    public Object showMyReviewList(@RequestParam("userId") String userId, Pageable pageable) throws Exception{
        Map<Object, Object> result = new HashMap<>();
        List<ReviewEntity> reviewEntityList =  reviewService.myReviewList(userId, pageable);
//        isbn13값으로 책 제목 찾기
        List<String> bookTitleList = new ArrayList<>();
        for(int i = 0; i < reviewEntityList.size(); i++){
            String isbn13 = reviewEntityList.get(i).getBookReviewIsbn13();
            List<BookEntity> bookEntities = bookInfoService.getOldBooksByIsbn13(isbn13);
            if(bookEntities.size() > 0){
                bookTitleList.add(bookEntities.get(0).getSaleBookTitle());
            }else{
                bookTitleList.add("판매하는 책이 아니어서 리뷰를 쓸 수 없습니다.");
            }
        }
        result.put("data1", reviewEntityList);
        result.put("data2", bookTitleList);
        return result;
    }

    //    마이페이지 - 내가 쓴 리뷰 개수
    @RequestMapping(value = "/login/myLogin/myReviewListCount", method = RequestMethod.GET)
    public int showMyReviewListCount(@RequestParam("userId") String userId) throws Exception {
        return reviewRepository.countByBookReviewBuyerId(userId);
    }

//    마이페이지 - 내가 작성한 게시물 내역
    @RequestMapping(value = "/login/myLogin/myBoardList", method = RequestMethod.GET)
    public Object showMyBoardList(@RequestParam("userId") String userId, Pageable pageable) throws Exception{
        return boardService.myBoardList(userId, pageable);
    }

    //    마이페이지 - 내가 작성한 게시물 개수
    @RequestMapping(value = "/login/myLogin/myBoardListCount", method = RequestMethod.GET)
    public int showMyBoardListCount(@RequestParam("userId") String userId, Pageable pageable) throws Exception{
        String[] list = {"배열","독후감"};
        return boardRepository.countByBoardWriterIdAndBoardCategoryIn(userId, list);
    }
}


























