import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import config from "../../config";

// Components
import UserNavbar from "./StudentHeader/StudentHeader";
import HackathonNotifications from "./Notification";
import HackathonsByStatus from "./hackathon/hackathon";
import ResourcePage from "../HackResource";
import RoomAllocationSchedule from "./roomallocation/RoomAllocationSchedule";
import TeamManagementDashboard from "./hackteamformation/hackteam";
import { HackathonProvider } from "./context/HackathonContext";
import TeamProblemStatementsPage from "./Problem Statements/Problemstatements";
import HackathonSubmissionForm from "./hacksubmission/hacksubmission";
import TeamProgressForm from "./Teamprogress/Teamprogess";
import AllTeamsProgressPage from "./Teamprogress/TeamsProgress";
import PublicGallery from "./PublicGallery";
import ProfilePage from "../hackprofiles";
import CombinedProgressPage from "./Teamprogress/CombinedProgressPage";
import WinnersPage from "./WinnersPage";
import NotFound from "../NotFound";
import StudentHome from "./StudentHome";
import StudentCertificates from "./certificates/StudentCertificates";
import HackathonHistory from "./HackathonHistory";

function HackStudent() {
  const [hackathonId, setHackathonId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOngoingHackathon = async () => {
      try {
        const studentId = localStorage.getItem("student");
        if (!studentId) {
          console.warn("⚠️ No studentId found in localStorage.");
          setIsLoading(false);
          return;
        }

        console.log("🔍 Fetching ongoing approved hackathon for student:", studentId);

        const { data } = await axios.get(
          `${config.backendUrl}/hackreg/student/${studentId}/ongoing-approved`
        );

        if (data?.hackathon) {
          const hackId = data.hackathon._id;
          setHackathonId(hackId);
          localStorage.setItem("selectedHackathonId", hackId);
          console.log("✅ Ongoing approved hackathon stored:", data.hackathon.hackathonname);
        } else {
          setHackathonId(null);
          localStorage.removeItem("selectedHackathonId");
          console.log("ℹ️ No ongoing approved hackathon found.");
        }
      } catch (error) {
        console.error("❌ Error fetching ongoing hackathon:", error);
        setHackathonId(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOngoingHackathon();
  }, []);

  // Show loading state while fetching hackathon
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your hackathon data...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <UserNavbar />
      <HackathonProvider>
        <Routes>
          <Route path="/" element={<StudentHome/>} />
          <Route path="/notifications" element={<HackathonNotifications />} />
          <Route path="/hackathon" element={<HackathonsByStatus />} />
          <Route path="/resources" element={<ResourcePage />} />
          <Route path="/roomallocation" element={<RoomAllocationSchedule />} />
          <Route path="/team-formation" element={<TeamManagementDashboard />} />
          <Route path="/problemstatements" element={<TeamProblemStatementsPage />} />
          <Route 
            path="/hacksubmission" 
            element={<HackathonSubmissionForm hackathonId={hackathonId} />} 
          />
          <Route path="/teamprogress" element={<TeamProgressForm />} />
          <Route path="/allteamsprogress" element={<AllTeamsProgressPage />} />
          <Route path="/gallery" element={<PublicGallery />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/combinedprogress" element={<CombinedProgressPage />} />
          <Route path="/winners" element={<WinnersPage />} />
          <Route path="/certificates" element={<StudentCertificates />} />
          <Route path="/hackathon-history" element={<HackathonHistory />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HackathonProvider>
    </div>
  );
}

export default HackStudent;