# 🚨 CRITICAL CONSTRAINTS (MUST READ FIRST)
AI는 아래 3가지 규칙을 어길 시 부적격한 디자인으로 간주합니다. 

1. **NO HARD-CODING:** 절대 HEX 코드(예: #FFFFFF)를 직접 입력하지 마세요. 오직 명시된 `Variables`만 사용합니다.
2. **AUTO LAYOUT ONLY:** 일반 Frame이나 Group 사용을 금지합니다. 모든 컨테이너는 반드시 Auto Layout (`Shift + A`) 기반이어야 합니다.
3. **INSTANCE ONLY:** 사각형(Rectangle)이나 원형으로 UI를 직접 그리지 마세요. 반드시 `Assets` 패널의 컴포넌트 인스턴스를 가져와 사용하세요.

---

## 1. Variables & Foundation (Zero Hard-coding Policy)
* **Color:** 모든 객체의 Fill과 Stroke에는 반드시 변수를 적용합니다.
    * 배경: `color/common/white`, `color/blue/blue01`
    * 포인트: `color/primary`
    * **Note:** 변수 목록에 없는 색상이 필요할 경우, 가장 유사한 시스템 변수를 사용하고 하드코딩하지 마세요.
* **Typography & Fallback:** * `Pretendard` 로드 실패 시 즉시 `Inter`로 교체하여 작업을 진행하세요. 이 과정에서 텍스트 레이어가 깨지지 않도록 주의합니다.
    * 임의의 폰트 사이즈(예: 13px, 17px 등 시스템에 없는 수치) 사용을 엄격히 금지합니다.

## 2. Component-First Workflow
* **Assets Path:** `Assets` 패널 -> `Create in this file` 내의 컴포넌트를 우선 사용합니다.
* **Primitive Shapes Forbidden:** 버튼, 인풋, 카드 등 이미 컴포넌트화 된 요소를 사각형과 텍스트로 새로 만드는 행위를 금지합니다.
* **Overrides:** 인스턴스의 속성(Variants)을 변경하여 상태(Hover, Active 등)를 표현하세요.
* **No Manual Overrides:** 인스턴스에 임의로 Border(Stroke), Effects(Shadow), Corner Radius를 추가하는 것을 엄격히 금지합니다.
    * **Bad:** 버튼 인스턴스를 선택하고 우측 패널에서 Stroke 1px 추가 (X)
    * **Good:** Border가 필요하다면 해당 속성이 포함된 다른 Variant로 교체 (O)
* **Property Only:** 컴포넌트의 모양을 바꾸고 싶다면 오직 해당 컴포넌트가 가진 'Component Properties'(Variants, Boolean 등)만 변경하세요. 
* **Layer Style Integrity:** 인스턴스 내부의 레이어 구조를 강제로 해제(Detach)하거나, 내부 요소의 스타일을 개별적으로 변경하지 마세요.

## 3. Layout & Structure (Strict Auto Layout)
* **Everything is Auto Layout:** 모든 버튼 그룹, 리스트, 카드 구성 요소는 Auto Layout이어야 합니다.
* **Resizing Rules:** * 가로 방향: 주로 `Fill Container`를 사용하여 반응형에 대응합니다.
    * 세로 방향: 콘텐츠 양에 따라 `Hug Contents`를 적절히 믹스합니다.
* **Alignment:** Auto Layout 내의 정렬(Alignment) 기능을 사용하여 요소를 배치하세요. (수동 좌표 이동 금지)

## 4. Iconography
* **Icon Source:** `Assets` -> `KLDS` -> `icons` 경로의 인스턴스만 허용합니다.
* **Icon Swap:** 다른 아이콘이 필요하면 인스턴스 스왑 기능을 사용하고, 아이콘 크기는 변수에 정의된 사이즈(예: 24px)를 유지하세요.

## 5. Naming & Organization
* **English Only:** 모든 레이어 이름은 영문 kebab-case(예: `main-navigation-bar`)로 작성합니다.
* **Clean Tree:** `Frame 1`, `Group 10`과 같은 자동 생성 이름이 최종 결과물에 남아있어서는 안 됩니다.


