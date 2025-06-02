package com.Dizplai.Polls.repository;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.Dizplai.Polls.model.Vote;

public interface VoteRepository extends MongoRepository<Vote, String> {
    List<Vote> findByPollId(String pollId);
}
