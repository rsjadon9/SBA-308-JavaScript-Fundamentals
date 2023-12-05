# SBA-308-JavaScript-Fundamentals


## Overview

This JavaScript module processes learner submissions for assignments in a course, factoring in due dates, late submission deductions, and calculates average scores for each learner.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Requirements](#requirements)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Code Structure](#code-structure)


## Introduction 

This module is designed to efficiently analyze learner submissions in a course, considering various factors that impact scores. It provides a clear overview of learner performance and facilitates data-driven insights for educators.

## Features

- *Dynamic Scoring:* Considers late submission deductions and due dates dynamically.
- *Error Handling:* Robust error handling for scenarios such as course ID mismatches and missing assignment IDs.
- *Customizable:* Easily adaptable to different course structures and assignment criteria.

## Requirements 
- JavaScript environment
- Input data conforming to the specified structures for `CourseInfo`, `AssignmentGroup`, and `LearnerSubmissions`
- Proper handling of exceptions during execution

## Installation 
No installation is required. Simply include the provided JavaScript code in your project.

## Usage 
1. *Data Configuration:*
   - Define `CourseInfo`, `AssignmentGroup`, and `LearnerSubmissions` according to your course specifications.
  
2. *Execution:*
   - Execute the `getLearnerData` function with your data.
   - Review the output, which provides detailed insights into learner performance.

## Code Structure 

- *`get_assignment` Function:* Retrieves assignment details based on assignment ID.
- *`getLearnerData` Function:* Main function for processing learner submissions and calculating average scores.
- *Error Handling:* Handles course ID mismatches, missing assignment IDs, and zero points possible scenarios.
- *Date Validations:* Validates due dates and considers late submission deductions.
