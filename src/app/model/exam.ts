export class Exam {
    public examId: string;
    public title: string;
    public type: string;
    public semester: string;
    public maxParticipants: number;
    public enrollments: number;
    public description: string;
    public enrollmentStart: Date;
    public enrollmentEnd: Date;
    public examDate: Date;
    public examStart: Date;
    public examEnd: Date;
    public subscribe: boolean;
    public participants: any[];
    public isEnrolled: boolean;

    constructor() {
        this.examId = '';
        this.title = '';
        this.type = '';
        this.semester = '';
        this.maxParticipants = 0;
        this.enrollments = 0;
        this.description = '';
        this.enrollmentStart = new Date();
        this.enrollmentEnd = new Date();
        this.examDate = new Date();
        this.examStart = new Date();
        this.examEnd = new Date();
        this.subscribe = false;
        this.participants = [];
        this.isEnrolled = false;
    }

}
