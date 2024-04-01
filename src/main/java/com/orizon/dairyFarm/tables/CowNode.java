package com.orizon.dairyFarm.tables;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CowNode {
    private String id;
    private List<CowNode> children;

    public CowNode(String id) {
        this.id = id;
        this.children = new ArrayList<>();
    }

    public void addChild(CowNode child) {
        this.children.add(child);
    }

    public Map<String, Object> toJson() {
        Map<String, Object> json = new HashMap<>();
        json.put("name", id);
        List<Map<String, Object>> childrenJson = new ArrayList<>();
        for (CowNode child : children) {
            childrenJson.add(child.toJson());
        }
        json.put("children", childrenJson);
        return json;
    }
}
