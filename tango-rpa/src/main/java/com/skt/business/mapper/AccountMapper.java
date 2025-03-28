package com.skt.business.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.skt.business.model.entity.Account;

@Mapper
public interface AccountMapper {
    List<Account> selectAccountsByGroupId(@Param("accountGroupId") Long accountGroupId);
}
