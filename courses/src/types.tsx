interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}

interface CourseCoreBase extends CoursePartBase {
    description: string;
}

interface CourseNormalPart extends CourseCoreBase {
    type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseCoreBase {
    type: "submission";
    description: string;
    exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CourseCoreBase {
    type: "special",
    requirements: string[]
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

export default CoursePart;
