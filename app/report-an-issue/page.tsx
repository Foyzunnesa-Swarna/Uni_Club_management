"use client";
import axios from "axios";
import { log } from "console";
import Link from "next/link";
import { useState } from "react";

interface Report {
  title: string;
  details: string;
  createdAt: string;
  postedBy: string;
}

const ReportAnIssue: React.FC = () => {
  const [newReport, setNewReport] = useState<Report>({
    title: "",
    details: "",
    createdAt: "",
    postedBy: "",
  });

  const handleReportSubmit = async () => {
    if (
      newReport.title.trim() !== "" &&
      newReport.details.trim() !== "" &&
      newReport.postedBy.trim() !== ""
    ) {
      const currentDate = new Date().toLocaleString();
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/report-an-issue`,
          { ...newReport, createdAt: currentDate }
        );
        setNewReport({
          title: "",
          details: "",
          createdAt: "",
          postedBy: "",
        });
      } catch (error) {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Report An Issue</h1>

      <div className="mb-4">
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2 mb-2"
          value={newReport.title}
          onChange={(e) =>
            setNewReport({ ...newReport, title: e.target.value })
          }
          placeholder="Title"
        />
        <textarea
          className="w-full border border-gray-300 rounded-md p-2"
          value={newReport.details}
          onChange={(e) =>
            setNewReport({ ...newReport, details: e.target.value })
          }
          placeholder="Write your post details here..."
          rows={4}
        ></textarea>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2 mt-2"
          value={newReport.postedBy}
          onChange={(e) =>
            setNewReport({ ...newReport, postedBy: e.target.value })
          }
          placeholder="Posted By"
        />
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={handleReportSubmit}
      >
        Submit Report
      </button>
    </div>
  );
};

export default ReportAnIssue;
