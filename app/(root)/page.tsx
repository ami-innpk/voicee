import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import { dummyInterviews } from "@/constants";
import {
  getCurrentUser,
} from "@/lib/actions/auth.action";
import { getInterviewsByUserId, getLatestInterviews } from "@/lib/actions/general.action";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async () => {
  const user = await getCurrentUser();

  const [userInterview,latestInterviews] = await Promise.all([
    getInterviewsByUserId(user?.id as string),
    getLatestInterviews({userId: user?.id as string})
  ]);

  const hasPastInterview = userInterview && userInterview.length > 0;
  const hasUpcomingInterview = latestInterviews && latestInterviews.length > 0;


  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview Ready With AI Powered Practice and Feedback</h2>

          <p className="text-lg">
            Practice on real interview questions and get instand feedback
          </p>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Get Started</Link>
          </Button>
        </div>

        <Image
          src={"/robot.png"}
          alt="robot"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>

        <div className="interviews-section">
          {hasPastInterview ? (
            userInterview.map((interview, index) => (
              <InterviewCard key={index} {...interview} />
            ))
          ) : (
            <p>You haven&#39;t taken any interviews yet</p>
          )}
          {/* {userInterview.map((interview, index) => (
            <InterviewCard key={index} {...interview} />
          ))} */}

          {/* <p>You haven&#39;t taken any interviews yet</p> */}
        </div>
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2> Take an Interview </h2>

        <div className="interviews-section">
        {hasUpcomingInterview ? (
            latestInterviews.map((interview, index) => (
              <InterviewCard key={index} {...interview} />
            ))
          ) : (
            <p>There are not latest interviews</p>
          )}
          {/* <p>there are no interviews available </p> */}
        </div>
      </section>
    </>
  );
};

export default page;
