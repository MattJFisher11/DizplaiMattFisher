package com.Dizplai.Polls.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.when;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import com.Dizplai.Polls.model.Poll;
import com.Dizplai.Polls.model.Vote;
import com.Dizplai.Polls.repository.PollRepository;
import com.Dizplai.Polls.repository.VoteRepository;

public class PollControllerTest {

    @InjectMocks
    private PollController pollController;

    @Mock
    private PollRepository pollRepository;

    @Mock
    private VoteRepository voteRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreatePoll() {
        Poll poll = new Poll();
        poll.setOptions(new ArrayList<>(Arrays.asList("Option 1", "Option 2")));
        when(pollRepository.save(any(Poll.class))).thenReturn(poll);
        ResponseEntity<?> response = pollController.createPoll(poll);
        assertEquals(200, response.getStatusCode().value());
        assertEquals(poll, response.getBody());
    }

    @Test
    public void testVote() {
        Poll poll = new Poll();
        poll.setId("123");
        poll.setOptions(Arrays.asList("Option 1", "Option 2", "Option 3"));
        when(pollRepository.findById("123")).thenReturn(Optional.of(poll));
        Vote savedVote = new Vote();
        savedVote.setPollId("123");
        savedVote.setOptionIndex(1);
        when(voteRepository.save(any(Vote.class))).thenReturn(savedVote);
        ResponseEntity<?> response = pollController.vote("123", 1);
        assertEquals(200, response.getStatusCode().value());
        assertTrue(response.getBody() instanceof Vote);
        assertEquals(1, ((Vote) response.getBody()).getOptionIndex());
    }

    @Test
    public void testGetVotes() {
        List<Vote> votes = Arrays.asList(new Vote(), new Vote());
        when(voteRepository.findByPollId("123")).thenReturn(votes);
        List<Vote> result = pollController.getVotes("123");
        assertEquals(2, result.size());
    }

    @Test
    public void testGetAllPolls() {
        List<Poll> polls = Arrays.asList(new Poll(), new Poll(), new Poll());
        when(pollRepository.findAll()).thenReturn(polls);
        List<Poll> result = pollController.getAllPolls();
        assertEquals(3, result.size());
    }
}
