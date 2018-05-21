export class Exam {
    public examId: string;
    public title: string;
    public type: string;
    public semester: string;
    public maxParticipants: number;
    public enrollments: number;
    public description: string;
    public enrollmentStart: string;
    public enrollmentEnd: string;
    public examDate: string;
    public examStart: string;
    public examEnd: string;
    public participants: any[];

    constructor() {
        this.examId = '';
        this.title = '';
        this.type = '';
        this.semester = '';
        this.maxParticipants = 0;
        this.enrollments = 0;
        this.description = '';
        this.enrollmentStart = '';
        this.enrollmentEnd = '';
        this.examDate = '';
        this.examStart = '';
        this.examEnd = '';
        this.participants = [];
    }
}
