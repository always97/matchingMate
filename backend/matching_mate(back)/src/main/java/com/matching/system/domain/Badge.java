package com.matching.system.domain;

import com.matching.system.dto.BadgeDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "badge")
public class Badge {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "over_matching_count", nullable = false)
    private Integer overMatchingCount;

    @Column(name = "img_address", nullable = false)
    private String imgAddress;

    public void updateBadge(BadgeDTO.BadgeStandardDTO badgeStandardDTO)
    {
        this.overMatchingCount = badgeStandardDTO.getOverMatchingCount();
        this.imgAddress = badgeStandardDTO.getImgAddress();
    }

}
