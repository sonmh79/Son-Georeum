package com.bbb.pjtname.db.domain;

import com.bbb.pjtname.api.request.InsertUserReq;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Getter //getter 생성
@AllArgsConstructor(access = AccessLevel.PROTECTED) //모든 필드 값을 파라미터로 받는 생성자를 만듦
@NoArgsConstructor //기본생성자 생성
public class User implements Serializable {

    //pk
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //Auto Increment 지원
    private Long id;

    //사용자 타입(NORMAL:일반,  KAKAO:카카오톡)
    @Column(nullable = false, length = 15)
    private String userType;

    //일반 회원 아이디
    @Column(unique = true, length = 100)
    private String email;

    //카카오톡 회원 아이디
    @Column(length = 100)
    private String kakaoId;

    //비밀번호
    @Column(length = 20)
    private String password;

    //닉네임
    @Column(unique = true, nullable = false, length = 15)
    private String nickname;

    //프로필 사진 URL
    @Column(length = 200)
    private String picture;

    //refresh토큰
    @Column(length = 200)
    private String refreshToken;

    //레벨
    @Column(nullable = false)
    private int level;

    //경험치
    @Column(nullable = false)
    private int experience;

    //가입일시
    @Column(nullable = false)
    private LocalDateTime createdDate;

    //spring security용 컬럼
    @Column(nullable = false, length = 15)
    private String role;

    //회원가입
    @Builder
    public User(InsertUserReq insertUserReq, LocalDateTime createDate){
        this.userType = insertUserReq.getUserType();
        this.email = insertUserReq.getEmail();
        this.password = insertUserReq.getPassword();
        this.nickname = insertUserReq.getNickname();
        this.picture = insertUserReq.getPicture();
        this.level = 1;
        this.experience = 0;
        this.createdDate = createDate;
        this.role = "ROLE_USER";
    }

    public void saveRefreshToken(String refreshToken){
        this.refreshToken = refreshToken;
    }

    public void deleteRefreshToken(){
        this.refreshToken = null;
    }



}