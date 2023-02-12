package com.bbb.songeoreum.api.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginReq {

    // 일반 회원 아이디
    @ApiModelProperty(example = "kim1234@ssafy.com") // Swagger에 예시로 보여줌.
    private String email;

    // 비밀번호
    private String password;
}
