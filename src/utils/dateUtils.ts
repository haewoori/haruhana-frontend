/**
 * 날짜를 "YYYY년 MM월 DD일" 형식으로 포맷팅
 */
export const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
};

/**
 * 날짜를 "우리은행 YY년도 M월 행번" 형식으로 포맷팅
 */
export const formatGroupTitle = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return `우리은행 ${year - 2000}년도 ${month}월 행번`;
};

/**
 * Date 객체를 'YYYY-MM-DD' 형식의 문자열로 변환
 * @param date - 변환할 Date 객체
 * @returns 'YYYY-MM-DD' 형식의 문자열
 */
export const formatDateToString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};