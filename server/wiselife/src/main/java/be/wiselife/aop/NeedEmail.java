package be.wiselife.aop;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)//메소드 호출시 사용하겠다
@Retention(RetentionPolicy.RUNTIME) //런타임시 유지되도록하겠다
public @interface NeedEmail {
}
