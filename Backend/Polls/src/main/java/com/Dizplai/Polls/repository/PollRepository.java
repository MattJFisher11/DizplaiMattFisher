package com.Dizplai.Polls.repository;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.Dizplai.Polls.model.Poll;

public interface PollRepository extends MongoRepository<Poll, String> {

}
