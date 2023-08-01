export interface FIBGameDataInterface {
	id: number;
	question: (string | null)[];
	answers: {
		index: number;
		answer: string;
	}[];
	submittedAnswers: {
		index: number;
		answer: string;
	}[];
	validationFIB: {
		score: number;
		correct: number;
		wrong: number;
	};
	error: string;
	hasreset: boolean;
	hasSubmitted: boolean;
}
