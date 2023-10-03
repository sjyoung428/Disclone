export const isKoreanName = (text: string) => {
  const koreanRegex = /^[ㄱ-ㅎㅏ-ㅣ가-힣\s]*$/;
  return koreanRegex.test(text);
};
