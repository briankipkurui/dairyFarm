package com.orizon.dairyFarm.controller;

import com.orizon.dairyFarm.request.FeedingFormulaRequest;
import com.orizon.dairyFarm.request.FeedingRecordsRequest;
import com.orizon.dairyFarm.service.FeedingRecordsService;
import com.orizon.dairyFarm.tables.FeedingFormulas;
import com.orizon.dairyFarm.tables.FeedingRecords;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1/feedingRecords")
public class FeedingRecordsController {
    private final FeedingRecordsService feedingRecordsService;

    @PostMapping("{feedingFormulaId}/{cattleId}")
    public void addFeedingRecord(@RequestBody FeedingRecordsRequest feedingFormulaRequest,
                                 @PathVariable("feedingFormulaId") Long feedingFormulaId,
                                 @PathVariable("cattleId") Long cattleId) {
        feedingRecordsService.addFeedingRecord(feedingFormulaRequest, feedingFormulaId, cattleId);
    }
    @GetMapping()
    public List<FeedingRecords> getAllFeedingRecords() {
        return feedingRecordsService.getAllFeedingRecords();
    }
}
