import './table.css';
import '../tag/tag.css';

const ICON = (name) =>
  `-webkit-mask-image:url(/assets/icons/${name});mask-image:url(/assets/icons/${name})`;

const FILTER_ICON = `<span class="klds-table__filter-icon" style="${ICON('ic-filter.svg')}"></span>`;

/** @type { import('@storybook/html').Meta } */
export default {
  title: 'Components/Table',
};

export const Default = {
  render: () => `
    <div style="padding:16px;">
      <div class="klds-table-wrapper">
        <div class="klds-table">

          <div class="klds-table__header">
            <div class="klds-table__th klds-table__col--flex">업무명</div>
            <div class="klds-table__th klds-table__col--120">요청자 ${FILTER_ICON}</div>
            <div class="klds-table__th klds-table__col--120">시작일</div>
            <div class="klds-table__th klds-table__col--120">종료일</div>
            <div class="klds-table__th klds-table__col--100">우선순위 ${FILTER_ICON}</div>
            <div class="klds-table__th klds-table__col--100">상태 ${FILTER_ICON}</div>
          </div>

          <!-- Row 1: 법인카드 사용 내역 정산 — 중간/진행 -->
          <div class="klds-table__row">
            <div class="klds-table__td klds-table__col--flex klds-table__td--task klds-table__td--task-default">
              <div class="klds-table__task-text">
                <span class="klds-table__task-label">1/26(월) 법인카드 사용 내역 정산</span>
                <div class="klds-table__red-dot-wrap"><span class="klds-table__red-dot"></span></div>
              </div>
            </div>
            <div class="klds-table__td klds-table__col--120">임혁수</div>
            <div class="klds-table__td klds-table__col--120">2026-01-26</div>
            <div class="klds-table__td klds-table__col--120">2026-01-26</div>
            <div class="klds-table__td klds-table__col--100">
              <span class="klds-tag klds-tag--small klds-tag--orange">
                <span class="klds-tag__icon"><span class="klds-table__mask-icon" style="${ICON('ic-minus.svg')}"></span></span>
                <span class="klds-tag__label">중간</span>
              </span>
            </div>
            <div class="klds-table__td klds-table__col--100">
              <span class="klds-tag klds-tag--small klds-tag--lightblue"><span class="klds-tag__label">진행</span></span>
            </div>
          </div>

          <!-- Row 2: 주간 회의 보고서 — 낮음/대기 -->
          <div class="klds-table__row">
            <div class="klds-table__td klds-table__col--flex klds-table__td--task klds-table__td--task-default">
              <div class="klds-table__task-text">
                <span class="klds-table__task-label">주간 회의 보고서 생성</span>
                <div class="klds-table__red-dot-wrap"><span class="klds-table__red-dot"></span></div>
              </div>
            </div>
            <div class="klds-table__td klds-table__col--120">박소정</div>
            <div class="klds-table__td klds-table__col--120">2026-01-26</div>
            <div class="klds-table__td klds-table__col--120">2026-01-26</div>
            <div class="klds-table__td klds-table__col--100">
              <span class="klds-tag klds-tag--small klds-tag--lightblue">
                <span class="klds-tag__icon"><span class="klds-table__mask-icon" style="${ICON('ic-caret-down01.svg')}"></span></span>
                <span class="klds-tag__label">낮음</span>
              </span>
            </div>
            <div class="klds-table__td klds-table__col--100">
              <span class="klds-tag klds-tag--small klds-tag--orange"><span class="klds-tag__label">대기</span></span>
            </div>
          </div>

          <!-- Row 3: ★ 부서 필수 교육 — 높음/진행 -->
          <div class="klds-table__row">
            <div class="klds-table__td klds-table__col--flex klds-table__td--task klds-table__td--task-star">
              <span class="klds-table__mask-icon klds-table__mask-icon--primary" style="${ICON('ic-star03-fill.svg')}"></span>
              <div class="klds-table__task-text">
                <span class="klds-table__task-label">부서 필수 교육 수료</span>
                <div class="klds-table__red-dot-wrap"><span class="klds-table__red-dot"></span></div>
              </div>
            </div>
            <div class="klds-table__td klds-table__col--120">AI</div>
            <div class="klds-table__td klds-table__col--120">2026-01-26</div>
            <div class="klds-table__td klds-table__col--120">2026-01-26</div>
            <div class="klds-table__td klds-table__col--100">
              <span class="klds-tag klds-tag--small klds-tag--red">
                <span class="klds-tag__icon"><span class="klds-table__mask-icon" style="${ICON('ic-caret-up.svg')}"></span></span>
                <span class="klds-tag__label">높음</span>
              </span>
            </div>
            <div class="klds-table__td klds-table__col--100">
              <span class="klds-tag klds-tag--small klds-tag--lightblue"><span class="klds-tag__label">진행</span></span>
            </div>
          </div>

          <!-- Row 4: ⚠ 디자인 시스템 개편 — 낮음/지연 -->
          <div class="klds-table__row">
            <div class="klds-table__td klds-table__col--flex klds-table__td--task klds-table__td--task-warning">
              <span class="klds-table__mask-icon klds-table__mask-icon--danger" style="${ICON('ic-triangle-warning.svg')}"></span>
              <span class="klds-table__task-label klds-table__task-label--warning">디자인 시스템 개편</span>
            </div>
            <div class="klds-table__td klds-table__col--120">박소정</div>
            <div class="klds-table__td klds-table__col--120">2025-12-01</div>
            <div class="klds-table__td klds-table__col--120">2026-01-16</div>
            <div class="klds-table__td klds-table__col--100">
              <span class="klds-tag klds-tag--small klds-tag--lightblue">
                <span class="klds-tag__icon"><span class="klds-table__mask-icon" style="${ICON('ic-caret-down01.svg')}"></span></span>
                <span class="klds-tag__label">낮음</span>
              </span>
            </div>
            <div class="klds-table__td klds-table__col--100">
              <span class="klds-tag klds-tag--small klds-tag--red"><span class="klds-tag__label">지연</span></span>
            </div>
          </div>

          <!-- Row 5: 사내 교육 동영상 — 높음/진행 -->
          <div class="klds-table__row">
            <div class="klds-table__td klds-table__col--flex klds-table__td--task">
              <span class="klds-table__task-label">사내 교육 동영상 시청</span>
            </div>
            <div class="klds-table__td klds-table__col--120">박소정</div>
            <div class="klds-table__td klds-table__col--120">2026-01-26</div>
            <div class="klds-table__td klds-table__col--120">2026-01-26</div>
            <div class="klds-table__td klds-table__col--100">
              <span class="klds-tag klds-tag--small klds-tag--red">
                <span class="klds-tag__icon"><span class="klds-table__mask-icon" style="${ICON('ic-caret-up.svg')}"></span></span>
                <span class="klds-tag__label">높음</span>
              </span>
            </div>
            <div class="klds-table__td klds-table__col--100">
              <span class="klds-tag klds-tag--small klds-tag--lightblue"><span class="klds-tag__label">진행</span></span>
            </div>
          </div>

          <!-- Row 6: 연말정산 — 높음/대기 -->
          <div class="klds-table__row">
            <div class="klds-table__td klds-table__col--flex klds-table__td--task">
              <span class="klds-table__task-label">연말정산 제출</span>
            </div>
            <div class="klds-table__td klds-table__col--120">윤지민</div>
            <div class="klds-table__td klds-table__col--120">2026-01-20</div>
            <div class="klds-table__td klds-table__col--120">2026-02-06</div>
            <div class="klds-table__td klds-table__col--100">
              <span class="klds-tag klds-tag--small klds-tag--red">
                <span class="klds-tag__icon"><span class="klds-table__mask-icon" style="${ICON('ic-caret-up.svg')}"></span></span>
                <span class="klds-tag__label">높음</span>
              </span>
            </div>
            <div class="klds-table__td klds-table__col--100">
              <span class="klds-tag klds-tag--small klds-tag--orange"><span class="klds-tag__label">대기</span></span>
            </div>
          </div>

          <!-- Row 7: ★ 연봉 협의안 — 높음/진행 -->
          <div class="klds-table__row">
            <div class="klds-table__td klds-table__col--flex klds-table__td--task klds-table__td--task-star">
              <span class="klds-table__mask-icon klds-table__mask-icon--primary" style="${ICON('ic-star03-fill.svg')}"></span>
              <span class="klds-table__task-label">연봉 협의안 작성</span>
            </div>
            <div class="klds-table__td klds-table__col--120">AI</div>
            <div class="klds-table__td klds-table__col--120">2026-01-26</div>
            <div class="klds-table__td klds-table__col--120">2026-02-04</div>
            <div class="klds-table__td klds-table__col--100">
              <span class="klds-tag klds-tag--small klds-tag--red">
                <span class="klds-tag__icon"><span class="klds-table__mask-icon" style="${ICON('ic-caret-up.svg')}"></span></span>
                <span class="klds-tag__label">높음</span>
              </span>
            </div>
            <div class="klds-table__td klds-table__col--100">
              <span class="klds-tag klds-tag--small klds-tag--lightblue"><span class="klds-tag__label">진행</span></span>
            </div>
          </div>

          <!-- Row 8: 브랜드 가이드 PPT — 높음/진행 -->
          <div class="klds-table__row">
            <div class="klds-table__td klds-table__col--flex klds-table__td--task">
              <span class="klds-table__task-label">브랜드 가이드 PPT 작성</span>
            </div>
            <div class="klds-table__td klds-table__col--120">김현수</div>
            <div class="klds-table__td klds-table__col--120">2026-01-26</div>
            <div class="klds-table__td klds-table__col--120">2026-01-26</div>
            <div class="klds-table__td klds-table__col--100">
              <span class="klds-tag klds-tag--small klds-tag--red">
                <span class="klds-tag__icon"><span class="klds-table__mask-icon" style="${ICON('ic-caret-up.svg')}"></span></span>
                <span class="klds-tag__label">높음</span>
              </span>
            </div>
            <div class="klds-table__td klds-table__col--100">
              <span class="klds-tag klds-tag--small klds-tag--lightblue"><span class="klds-tag__label">진행</span></span>
            </div>
          </div>

          <!-- Row 9: Stitch 활용법 — 높음/진행 -->
          <div class="klds-table__row">
            <div class="klds-table__td klds-table__col--flex klds-table__td--task">
              <span class="klds-table__task-label">Stitch 활용법 문서 작성</span>
            </div>
            <div class="klds-table__td klds-table__col--120">박소정</div>
            <div class="klds-table__td klds-table__col--120">2026-01-26</div>
            <div class="klds-table__td klds-table__col--120">2026-01-26</div>
            <div class="klds-table__td klds-table__col--100">
              <span class="klds-tag klds-tag--small klds-tag--red">
                <span class="klds-tag__icon"><span class="klds-table__mask-icon" style="${ICON('ic-caret-up.svg')}"></span></span>
                <span class="klds-tag__label">높음</span>
              </span>
            </div>
            <div class="klds-table__td klds-table__col--100">
              <span class="klds-tag klds-tag--small klds-tag--lightblue"><span class="klds-tag__label">진행</span></span>
            </div>
          </div>

        </div>
      </div>
    </div>
  `,
};
