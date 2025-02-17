package com.matching.system.repository;

import com.matching.system.domain.MatchingHistory;
import com.matching.system.domain.Member;
import com.matching.system.domain.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
    @Query(value = "SELECT r.target_member_id, avg(r.skill_point) as skill_point, avg(r.manner_point) as manner_point FROM rating r WHERE r.target_member_id=:id GROUP BY r.target_member_id", nativeQuery =  true)
    Rating findByMemberAvgPoint(@Param(value = "id") Long memberId);

    @Query("SELECT r FROM Rating r " +
            "JOIN FETCH r.matchingHistory " +
            "JOIN FETCH r.targetMember " +
            "JOIN FETCH r.member " +
            "WHERE r.matchingHistory=:matchingHistory AND r.targetMember=:targetMember AND r.member=:member")
    Optional<Rating> findByMatchingHistoryIdAndMemberIdAndTargetMemberId(@Param("matchingHistory") MatchingHistory matchingHistory, @Param("member") Member member, @Param("targetMember") Member targetMember);

    @Query(value = "SELECT AVG(r.manner_point) AS manner_point FROM Rating r WHERE r.target_member_id=:id GROUP BY r.target_member_id",nativeQuery = true)
    Float findByAvgMannerPoint(Long id);

    @Query(value = "SELECT AVG(r.skill_point) AS skill_point FROM Rating r WHERE r.target_member_id=:id GROUP BY r.target_member_id",nativeQuery = true)
    Float findByAvgSkillPoint(Long id);

    List<Rating> findByTargetMemberId(Long id);

    List<Rating> findByMemberId(Long id);

    void deleteByTargetMemberId(Long memberId);
}
