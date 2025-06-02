package com.Dizplai.Polls.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Dizplai.Polls.model.Poll;
import com.Dizplai.Polls.model.Vote;
import com.Dizplai.Polls.repository.PollRepository;
import com.Dizplai.Polls.repository.VoteRepository;

@CrossOrigin 
@RestController
@RequestMapping("/polls")
public class PollController {

    @Autowired PollRepository pollRepository;

    @Autowired
    private VoteRepository voteRepository;

    // Create a new poll
    @PostMapping
    public ResponseEntity<?> createPoll(@RequestBody Poll poll) {
        if (poll.getOptions().size() < 2 || poll.getOptions().size() > 7) {
            return ResponseEntity.badRequest().body("Poll must have 2 to 7 options.");
        }
        return ResponseEntity.ok(pollRepository.save(poll));
    }

    // Vote on a poll
    @PostMapping("/{pollId}/vote")
    public ResponseEntity<?> vote(@PathVariable String pollId, @RequestParam int optionIndex) {
        Poll poll = pollRepository.findById(pollId).orElse(null);
        if (poll == null || optionIndex < 0 || optionIndex >= poll.getOptions().size()) {
            return ResponseEntity.badRequest().body("Invalid poll or option.");
        }
        Vote vote = new Vote();
        vote.setPollId(pollId);
        vote.setOptionIndex(optionIndex);
        return ResponseEntity.ok(voteRepository.save(vote));
    }

    // Get votes for a poll
    @GetMapping("/{pollId}/votes")
    public List<Vote> getVotes(@PathVariable String pollId) {
        return voteRepository.findByPollId(pollId);
    }

    @GetMapping("allPolls")
    public List<Poll> getAllPolls() {
        return pollRepository.findAll();
    }
}
