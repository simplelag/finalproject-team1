//package com.bitc.finalproject.configuration;
//
//import jakarta.servlet.DispatcherType;
//import lombok.RequiredArgsConstructor;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//
//@RequiredArgsConstructor
//@Configuration
//public class SecurityConfiguration {
//
////    private final MemberDetailService memberDetailService;
//
//    @Bean
//    public BCryptPasswordEncoder bCryptPasswordEncoder(){
//        return new BCryptPasswordEncoder();
//    }
//
//    @Bean
//    public WebSecurityCustomizer configure(){
//        return (web) -> web.ignoring()
//                .requestMatchers("/static/**");
//    }
//
//    //  스프링 시큐리티 필터 설정
//    // 강사님이 수정해서 주신 코드
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        //    authorizeRequests() : 인증 목록 설정
//        //    dispatcherTypeMatchers(DispatcherType) : 서버 내부에서 포워드 시 권한 설정
//        //    requestMatchers(url) : 사용자 요청 주소 매핑
//        //    permitAll() : 모든 권한 허용
//        //    anyRequest() : 모든 요청, 마지막에 있어야 함
//        //    authenticated() : 권한 인증 필요
//        //    and() : 추가 옵션 설정 시 사용
//        //    formLogin() : 로그인 폼 화면 사용
//        //    loginPage(url) : 사용자 지정 로그인 화면 url 설정
//        //    defaultSuccessUrl(url) : 로그인 성공 시 출력할 화면 url 설정
//        //    usernameParameter(name) : 로그인 시 서버로 전송하는 아이디의 input 태그 name 속성값
//        //    passwordParameter(name) : 로그인 시 서버로 전송하는 비밀번호의 input 태그 name 속성값
//        //    logout() : 로그아웃 사용 여부
//        //    logoutSuccessUrl(url) : 로그아웃 성공 시 출력할 화면 url 설정
//        //    invalidateHttpSession() : 모든 세션 정보 삭제
//        //    csrf().disable() : CSRF 공격(Cross Site Request Forgery)은 웹 어플리케이션 취약점 중 하나로 인터넷 사용자(희생자)가 자신의 의지와는 무관하게 공격자가 의도한 행위(수정, 삭제, 등록 등)를 특정 웹사이트에 요청하게 만드는 공격
//        //    참고 https://itstory.tk/entry/CSRF-%EA%B3%B5%EA%B2%A9%EC%9D%B4%EB%9E%80-%EA%B7%B8%EB%A6%AC%EA%B3%A0-CSRF-%EB%B0%A9%EC%96%B4-%EB%B0%A9%EB%B2%95
//        //    cors()disable() :
//        //    return http
//        //        .authorizeRequests()
//        //          .requestMatchers("/login", "/signup", "/user").permitAll()
//        //          .anyRequest().authenticated()
//        //        .and().formLogin()
//        //          .loginPage("/login")
//        ////          .defaultSuccessUrl("/articles")
//        //        .and().logout()
//        //          .logoutSuccessUrl("/login")
//        //        .invalidateHttpSession(true)
//        //        .and().csrf().disable()
//        //        .build();
//
//        return http
//                .csrf(httpSecurityCsrfConfigurer -> httpSecurityCsrfConfigurer.disable())
//                .cors(httpSecurityCorsConfigurer -> httpSecurityCorsConfigurer.disable())
//                .authorizeHttpRequests(authorizeHttpRequestsConfigurer -> authorizeHttpRequestsConfigurer
//                        .dispatcherTypeMatchers(DispatcherType.FORWARD).permitAll()
//                        .requestMatchers("/login", "/signup", "/user", "/board").permitAll()
//                        .anyRequest().authenticated())
//                .formLogin(formLoginConfigurer -> formLoginConfigurer
//                        .loginPage("/login")
//                        //            .loginProcessingUrl("/login_process")
//                        .usernameParameter("email")
//                        .passwordParameter("password")
////                        .defaultSuccessUrl("/login_ok")
//                        .defaultSuccessUrl("/board")
//                        .permitAll())
//                //        .logout(Customizer.withDefaults())
//                .logout(logoutConfigurer -> logoutConfigurer
//                        .logoutSuccessUrl("/login")
//                        .invalidateHttpSession(true)
//                        .clearAuthentication(true))
//                .build();
//    }
//
//    @Bean
//    public AuthenticationManager authenticationManager(HttpSecurity http, BCryptPasswordEncoder bCryptPasswordEncoder, MemberDetailService memberDetailService) throws Exception {
//
//        AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
//        authenticationManagerBuilder.userDetailsService(memberDetailService).passwordEncoder(bCryptPasswordEncoder);
//        return authenticationManagerBuilder.build();
//    }
//}





























