/**
 * Midnight Navy Wedding Invitation Configuration
 *
 * 이 파일에서 청첩장의 모든 정보를 수정할 수 있습니다.
 * 이미지는 설정이 필요 없습니다. 아래 폴더에 순번 파일명으로 넣으면 자동 감지됩니다.
 *
 * 이미지 폴더 구조 (파일명 규칙):
 *   images/hero/1.jpg      - 메인 사진 (1장, 필수)
 *   images/story/1.jpg, 2.jpg, ...  - 스토리 사진들 (순번, 자동 감지)
 *   images/gallery/1.jpg, 2.jpg, ... - 갤러리 사진들 (순번, 자동 감지)
 *   images/location/1.jpg  - 약도/지도 이미지 (1장)
 *   images/og/1.jpg        - 카카오톡 공유 썸네일 (1장)
 */

const CONFIG = {
  // ── 초대장 열기 ──
  useCurtain: true,  // 초대장 열기 화면 사용 여부 (true: 사용, false: 바로 본문 표시)

  // ── 메인 (히어로) ──
  groom: {
    name: "이용성",
    nameEn: "Groom",
    father: "이보균",
    mother: "윤경희",
    fatherDeceased: false,
    motherDeceased: false
  },

  bride: {
    name: "전다영",
    nameEn: "Bride",
    father: "전준현",
    mother: "강인선",
    fatherDeceased: false,
    motherDeceased: false
  },

  wedding: {
    date: "2026-11-26",
    // time: "",
    // venue: "",
    // hall: "",
    // address: "",
    // tel: ""
  },

  // ── 인사말 ──
  greeting: {
    title: "We Are Married",
    content: "저희 두사람,\n 부부가 되었습니다.\n\n \
              많은 분들을 모시고 기쁜 소식을 전하고 싶었지만,\n 별도의 예식 없이\n 조용히 새로운 시작을 하게 되었습니다.\n\n \
              직접 인사드리지 못하는 아쉬움,\n 너그러운 마음으로 이해해 주시고\n 저희의 앞날을 축복해 주세요."
  },

  // ── 우리의 이야기 ──
  story: {
    title: "Our Story",
    content: "2020년 처음 만나\n 긴 시간 사랑을 키워온 두 사람.\n\n \
              이제는 부부가 되어\n 같은 길을 걸어가려 합니다.\n\n \
              서로 아끼고 사랑하며\n 오래도록 행복하게 살겠습니다."
  },

  // ── 오시는 길 ──
  // mapLinks: {
  //   kakao: "https://map.kakao.com/",
  //   naver: "https://map.naver.com/"
  // },

  // // ── 마음 전하실 곳 ──
  // accounts: {
  //   groom: [
  //     { role: "신랑", name: "홍길동", bank: "국민은행", number: "000-000-000000" },
  //     { role: "아버지", name: "홍판서", bank: "신한은행", number: "000-000-000000" },
  //     { role: "어머니", name: "김부인", bank: "우리은행", number: "000-000-000000" }
  //   ],
  //   bride: [
  //     { role: "신부", name: "김영희", bank: "하나은행", number: "000-000-000000" },
  //     { role: "아버지", name: "김사장", bank: "기업은행", number: "000-000-000000" },
  //     { role: "어머니", name: "이부인", bank: "농협은행", number: "000-000-000000" }
  //   ]
  // },

  // ── 링크 공유 시 나타나는 문구 ──
  meta: {
    title: "신랑 ♥ 신부 결혼했어요",
    description: "저희의 결혼을 알립니다."
  }
};
