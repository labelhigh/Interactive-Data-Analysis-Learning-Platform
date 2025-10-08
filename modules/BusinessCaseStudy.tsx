
import React, { useState } from 'react';
import ModuleContainer from '../components/ModuleContainer';
import { ChartBarIcon, MagnifyingGlassIcon, SparklesIcon, PresentationChartLineIcon } from '../components/icons';

interface CaseStudy {
    id: number;
    title: string;
    description: string;
    icon: string;
    steps: {
        title: string;
        description: string;
        Icon: React.FC<{ className?: string }>;
        content: React.ReactNode;
    }[];
}

const caseStudies: CaseStudy[] = [
    {
        id: 1,
        title: "提升用戶活躍度",
        description: "分析一款生產力應用的數據，找出日活躍用戶 (DAU) 增長停滯的原因。",
        icon: "📈",
        steps: [
            {
                title: "定義問題",
                description: "我們的目標是什麼？",
                Icon: MagnifyingGlassIcon,
                content: (
                    <>
                        <p><strong>商業背景：</strong> 一款名為 "TaskMaster" 的生產力應用程式，發現過去三個月的「每日活躍用戶 (DAU)」增長停滯。</p>
                        <p className="mt-2"><strong>分析目標：</strong> 找出導致用戶活躍度停滯的潛在原因，並提出能提升活躍度的產品優化建議。</p>
                    </>
                ),
            },
            {
                title: "提出假設",
                description: "我們猜測可能的原因是什麼？",
                Icon: SparklesIcon,
                content: (
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>假設1 (WHAT):</strong> 新註冊用戶的次日留存率下降了。</li>
                        <li><strong>假設2 (WHY):</strong> 可能是因為新用戶引導流程 (Onboarding) 不夠清晰，導致用戶無法快速體驗到產品的核心價值。</li>
                        <li><strong>假設3 (WHAT):</strong> 用戶在「創建第一個任務」這個環節的流失率特別高。</li>
                        <li><strong>假設4 (WHY):</strong> 可能是因為創建任務的介面太複雜，或是有 Bug 存在。</li>
                    </ul>
                ),
            },
            {
                title: "數據分析與發現",
                description: "數據告訴了我們什麼？",
                Icon: ChartBarIcon,
                content: (
                    <>
                        <p>在分析了用戶行為數據後，我們發現：</p>
                        <ul className="list-disc list-inside space-y-2 mt-2">
                            <li><strong>發現 A:</strong> 數據證實了假設1，新用戶的次日留存率從 40% 下降到了 25%。</li>
                            <li><strong>發現 B:</strong> 我們建立了一個用戶行為漏斗，數據顯示高達 60% 的新用戶在註冊後未能成功創建他們的第一個任務，這證實了假設3。</li>
                            <li><strong>發現 C:</strong> 我們進一步將「未能創建任務」的用戶分群，發現使用 Android 版本的用戶失敗率遠高於 iOS 用戶，這指向了假設4的可能性。</li>
                        </ul>
                        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <p className="font-semibold">關鍵洞察：</p>
                            <p>用戶活躍度停滯的主要瓶頸在於 <strong className="text-blue-500">Android 端新用戶創建任務的成功率過低</strong>，這嚴重影響了新用戶的留存。</p>
                        </div>
                    </>
                ),
            },
            {
                title: "結論與建議",
                description: "我們應該採取什麼行動？",
                Icon: PresentationChartLineIcon,
                content: (
                     <ul className="list-decimal list-inside space-y-2 font-semibold">
                        <li><span className="font-bold">[高優先級] 技術排查：</span><span className="font-normal"> 立即對 Android 版本的「創建任務」流程進行全面的技術審查和 Bug 測試。</span></li>
                        <li><span className="font-bold">[中優先級] 優化引導：</span><span className="font-normal"> 簡化新用戶引導流程，增加一個動畫或提示，引導用戶完成他們的第一個任務。</span></li>
                        <li><span className="font-bold">[持續追蹤] 數據監控：</span><span className="font-normal"> 建立一個數據儀表板，持續監控新用戶留存率和任務創建成功率。</span></li>
                    </ul>
                ),
            }
        ],
    },
    {
        id: 2,
        title: "電商購物籃分析",
        description: "挖掘用戶購物數據，找出商品之間的關聯性，以提升交叉銷售。",
        icon: "🛒",
        steps: [
            {
                title: "定義問題",
                description: "我們的目標是什麼？",
                Icon: MagnifyingGlassIcon,
                content: <p>一家線上超市希望透過分析用戶的交易紀錄，發現哪些商品經常被一起購買，以優化商品推薦和促銷組合，進而提升客單價。</p>,
            },
            {
                title: "提出假設",
                description: "我們猜測可能的原因是什麼？",
                Icon: SparklesIcon,
                content: <p>我們假設購買「麵包」的顧客也很可能同時購買「牛奶」和「雞蛋」。此外，可能存在一些意想不到的商品組合，例如「尿布」和「啤酒」。</p>,
            },
            {
                title: "數據分析與發現",
                description: "數據告訴了我們什麼？",
                Icon: ChartBarIcon,
                content: (
                    <>
                        <p>使用「關聯規則分析」，我們處理了10萬筆交易數據，主要發現如下：</p>
                        <ul className="list-disc list-inside space-y-2 mt-2">
                            <li><strong>強關聯:</strong> 「麵包 → 牛奶」的規則具有很高的「信賴度」(Confidence)，表示購買麵包的顧客中有極高比例會買牛奶。</li>
                            <li><strong>意外發現:</strong> 數據證實了「尿布 → 啤酒」的關聯性，其「提升度」(Lift) 指標顯著，說明這兩者一起購買的機率遠高於它們各自被獨立購買的機率。</li>
                        </ul>
                    </>
                ),
            },
            {
                title: "結論與建議",
                description: "我們應該採取什麼行動？",
                Icon: PresentationChartLineIcon,
                content: (
                    <ul className="list-decimal list-inside space-y-2">
                        <li>在麵包的商品頁面推薦牛奶和雞蛋。</li>
                        <li>設計「早餐組合」優惠套餐。</li>
                        <li>針對購買尿布的顧客，推送啤酒的折扣券，進行精準營銷。</li>
                    </ul>
                ),
            }
        ],
    },
     {
        id: 3,
        title: "客戶流失預警",
        description: "為一家訂閱制流媒體服務，建立模型以預測哪些用戶可能即將流失。",
        icon: "👋",
        steps: [
            {
                title: "定義問題",
                Icon: MagnifyingGlassIcon,
                description: "我們的目標是什麼？",
                content: <p>一家流媒體公司發現其月度客戶流失率持續上升。目標是建立一個預測模型，提前識別出具有高流失風險的用戶，以便採取挽留措施。</p>,
            },
            {
                title: "提出假設",
                Icon: SparklesIcon,
                description: "我們猜測可能的原因是什麼？",
                content: <p>假設用戶的觀看時長減少、登錄頻率降低、以及近期有過客服投訴，是預示其可能流失的關鍵指標。</p>,
            },
            {
                title: "數據分析與發現",
                Icon: ChartBarIcon,
                description: "數據告訴了我們什麼？",
                content: (
                    <>
                        <p>我們利用歷史用戶數據訓練了一個「邏輯迴歸」分類模型。模型的特徵包含：</p>
                         <ul className="list-disc list-inside space-y-2 mt-2">
                            <li>每月觀看時數</li>
                            <li>距離上次登入天數</li>
                            <li>訂閱方案等級</li>
                            <li>客服投訴次數</li>
                        </ul>
                        <p className="mt-2">模型分析顯示，「距離上次登入天數」是預測流失的最強變量。該模型的預測準確率達到了85%。</p>
                    </>
                ),
            },
            {
                title: "結論與建議",
                Icon: PresentationChartLineIcon,
                description: "我們應該採取什麼行動？",
                content: (
                     <ul className="list-decimal list-inside space-y-2">
                        <li>對模型標記出的高風險用戶，自動化發送個人化的內容推薦郵件。</li>
                        <li>提供一個月的折扣優惠，吸引他們繼續訂閱。</li>
                        <li>進行A/B測試，比較不同挽留策略的效果。</li>
                    </ul>
                ),
            }
        ],
    },
    {
        id: 4,
        title: "廣告投放效益評估",
        description: "分析不同線上廣告渠道的表現，以優化未來的廣告預算分配。",
        icon: "📢",
        steps: [
            {
                title: "定義問題",
                Icon: MagnifyingGlassIcon,
                description: "我們的目標是什麼？",
                content: <p>一家公司在社群媒體、搜尋引擎和內容聯盟上都投放了廣告。他們需要知道哪個渠道的「投資回報率 (ROI)」最高，以便更有效地分配預算。</p>,
            },
            {
                title: "提出假設",
                Icon: SparklesIcon,
                description: "我們猜測可能的原因是什麼？",
                content: <p>假設搜尋引擎廣告因為用戶意圖明確，其轉化率和ROI將會是最高的。社群媒體廣告的點擊成本最低，但轉化率也較低。</p>,
            },
            {
                title: "數據分析與發現",
                Icon: ChartBarIcon,
                description: "數據告訴了我們什麼？",
                content: (
                    <>
                         <p>通過追蹤各渠道的「點擊成本 (CPC)」、「轉化率 (CVR)」和「客戶獲取成本 (CAC)」，我們發現：</p>
                        <ul className="list-disc list-inside space-y-2 mt-2">
                            <li><strong>搜尋引擎:</strong> CAC最低，ROI最高 (3.5)，證實了假設。</li>
                            <li><strong>社群媒體:</strong> 觸及範圍廣，CPC最低，但用戶轉化為付費客戶的比率也最低。</li>
                             <li><strong>內容聯盟:</strong> ROI居中，但在品牌曝光方面表現良好。</li>
                        </ul>
                    </>
                ),
            },
            {
                title: "結論與建議",
                Icon: PresentationChartLineIcon,
                description: "我們應該採取什麼行動？",
                content: (
                     <ul className="list-decimal list-inside space-y-2">
                        <li>將70%的廣告預算分配給搜尋引擎廣告，以最大化直接回報。</li>
                        <li>利用社群媒體廣告進行品牌建設和潛在客戶開發，而非直接追求轉化。</li>
                        <li>優化內容聯盟的登陸頁面，以提高其轉化率。</li>
                    </ul>
                ),
            }
        ],
    },
    {
        id: 5,
        title: "產品定價策略優化",
        description: "分析銷售數據與用戶畫像，為一款SaaS產品找到最佳的定價方案。",
        icon: "💰",
        steps: [
            {
                title: "定義問題",
                Icon: MagnifyingGlassIcon,
                description: "我們的目標是什麼？",
                content: <p>一家SaaS公司提供三種訂閱方案：基礎版、專業版、企業版。公司希望了解哪個方案最受歡迎，以及是否存在價格敏感度問題，以優化定價結構。</p>,
            },
            {
                title: "提出假設",
                Icon: SparklesIcon,
                description: "我們猜測可能的原因是什麼？",
                content: <p>假設「專業版」因其性價比最高而成為最受歡迎的選擇。同時，假設從「基礎版」升級到「專業版」的用戶比例很低，可能是因為價格跳躍太大。</p>,
            },
            {
                title: "數據分析與發現",
                Icon: ChartBarIcon,
                description: "數據告訴了我們什麼？",
                content: (
                    <>
                        <p>分析訂閱數據和用戶行為，我們發現：</p>
                        <ul className="list-disc list-inside space-y-2 mt-2">
                            <li>65%的用戶選擇了「專業版」，證實了其受歡迎程度。</li>
                            <li>僅有5%的「基礎版」用戶在一年內升級，升級率確實很低。</li>
                             <li>用戶調查顯示，許多基礎版用戶認為專業版的價格高於他們願意支付的水平。</li>
                        </ul>
                    </>
                ),
            },
            {
                title: "結論與建議",
                Icon: PresentationChartLineIcon,
                description: "我們應該採取什麼行動？",
                content: (
                     <ul className="list-decimal list-inside space-y-2">
                        <li>在「基礎版」和「專業版」之間新增一個「進階版」方案，提供部分專業功能，價格更平易近人。</li>
                        <li>對「專業版」進行A/B測試，嘗試「年付折扣」方案，以提高其吸引力。</li>
                         <li>突出「企業版」的客製化和安全功能，以吸引大型客戶。</li>
                    </ul>
                ),
            }
        ],
    },
    {
        id: 6,
        title: "銷售預測與庫存管理",
        description: "為零售連鎖店建立時間序列模型，預測未來三個月的商品銷售量。",
        icon: "📦",
        steps: [
            {
                title: "定義問題", Icon: MagnifyingGlassIcon, description: "我們的目標是什麼？",
                content: <p>一家零售連鎖店經常面臨熱銷商品缺貨或滯銷商品庫存過多的問題。目標是利用歷史銷售數據，建立一個準確的模型來預測未來銷售量，以優化庫存水平。</p>,
            },
            {
                title: "提出假設", Icon: SparklesIcon, description: "我們猜測可能的原因是什麼？",
                content: <p>假設銷售數據存在明顯的「季節性」和「趨勢性」。例如，飲料在夏季銷量更高，而整體銷售額呈逐年上升趨勢。節假日也會對銷量產生顯著影響。</p>,
            },
            {
                title: "數據分析與發現", Icon: ChartBarIcon, description: "數據告訴了我們什麼？",
                content: (
                    <>
                        <p>我們採用了「ARIMA時間序列模型」對過去三年的銷售數據進行分析，並將節假日作為外部變量納入模型。發現：</p>
                        <ul className="list-disc list-inside space-y-2 mt-2">
                           <li>模型成功捕捉到了夏季和聖誕節的銷售高峰。</li>
                           <li>數據顯示了一個年均增長5%的穩定上升趨勢。</li>
                           <li>模型對未來三個月的銷售預測誤差率（MAPE）控制在10%以內。</li>
                        </ul>
                    </>
                ),
            },
            {
                title: "結論與建議", Icon: PresentationChartLineIcon, description: "我們應該採取什麼行動？",
                content: (
                    <ul className="list-decimal list-inside space-y-2">
                        <li>根據模型的預測結果，提前調整採購和庫存計劃。</li>
                        <li>為預測到的銷售高峰期增派人手。</li>
                        <li>每個月用最新的銷售數據重新訓練模型，以保持其準確性。</li>
                    </ul>
                ),
            }
        ],
    },
    {
        id: 7,
        title: "網站A/B測試分析",
        description: "分析一個電商網站首頁改版的A/B測試結果，判斷新設計是否更有效。",
        icon: "🧪",
        steps: [
            {
                title: "定義問題", Icon: MagnifyingGlassIcon, description: "我們的目標是什麼？",
                content: <p>一個電商網站重新設計了其首頁，將「立即購買」按鈕從藍色改為更醒目的橘色（B版本）。我們的目標是通過A/B測試，確定新版設計是否能顯著提高「加入購物車」的轉化率。</p>,
            },
            {
                title: "提出假設", Icon: SparklesIcon, description: "我們猜測可能的原因是什麼？",
                content: <p>我們的「虛無假設」(H0)是兩個版本的轉化率沒有差異。我們的「對立假設」(H1)是橘色按鈕（B版本）的轉化率高於藍色按鈕（A版本）。</p>,
            },
            {
                title: "數據分析與發現", Icon: ChartBarIcon, description: "數據告訴了我們什麼？",
                content: (
                    <>
                        <p>在為期兩週的測試中，我們將50%的流量分配給A版本，50%分配給B版本。數據顯示：</p>
                        <ul className="list-disc list-inside space-y-2 mt-2">
                           <li>A版本（藍色按鈕）的轉化率為 2.5%。</li>
                           <li>B版本（橘色按鈕）的轉化率為 3.1%。</li>
                           <li>我們進行了「獨立樣本t檢定」，計算出的 p-value 小於 0.05。</li>
                        </ul>
                         <p className="mt-2">這個結果具有統計顯著性，意味著我們可以拒絕虛無假設。</p>
                    </>
                ),
            },
            {
                title: "結論與建議", Icon: PresentationChartLineIcon, description: "我們應該採取什麼行動？",
                content: (
                    <ul className="list-decimal list-inside space-y-2">
                        <li>B版本的表現顯著優於A版本。</li>
                        <li>建議將網站所有的「立即購買」按鈕全部更換為橘色設計。</li>
                        <li>後續可以進一步測試按鈕上的文案，例如「立即購買」vs「加入購物車」。</li>
                    </ul>
                ),
            }
        ],
    },
    {
        id: 8,
        title: "社交媒體情感分析",
        description: "分析公眾在社交媒體上對某品牌的情感傾向，以評估品牌形象。",
        icon: "❤️",
        steps: [
            {
                title: "定義問題", Icon: MagnifyingGlassIcon, description: "我們的目標是什麼？",
                content: <p>一家新發布了旗艦手機的公司，希望了解消費者在社交媒體（如Twitter）上對這款新產品的普遍看法是正面的、負面的還是中性的。</p>,
            },
            {
                title: "提出假設", Icon: SparklesIcon, description: "我們猜測可能的原因是什麼？",
                content: <p>假設大部分的討論會是正面的，集中在新的攝影功能上。同時，也可能存在關於電池續航力的負面評論。</p>,
            },
            {
                title: "數據分析與發現", Icon: ChartBarIcon, description: "數據告訴了我們什麼？",
                content: (
                    <>
                        <p>我們使用「自然語言處理 (NLP)」技術，收集了超過5萬條相關推文，並對其進行情感分類：</p>
                        <ul className="list-disc list-inside space-y-2 mt-2">
                           <li><strong>正面情感 (60%):</strong> 大多數讚揚了手機的設計和攝影品質。</li>
                           <li><strong>負面情感 (25%):</strong> 主要抱怨集中在電池續航不如預期和價格過高。</li>
                           <li><strong>中性情感 (15%):</strong> 主要是新聞報導和規格討論。</li>
                        </ul>
                    </>
                ),
            },
            {
                title: "結論與建議", Icon: PresentationChartLineIcon, description: "我們應該採取什麼行動？",
                content: (
                    <ul className="list-decimal list-inside space-y-2">
                        <li>在市場營銷中，繼續強調產品的攝影優勢。</li>
                        <li>發布一篇官方博客，提供省電技巧，並在下次軟體更新中優化電池性能。</li>
                        <li>公關團隊應主動回應關於價格的疑慮，強調其價值。</li>
                    </ul>
                ),
            }
        ],
    },
    {
        id: 9,
        title: "物流路線優化",
        description: "為一家快遞公司分析配送數據，以規劃更高效的配送路線，降低成本。",
        icon: "🚚",
        steps: [
            {
                title: "定義問題", Icon: MagnifyingGlassIcon, description: "我們的目標是什麼？",
                content: <p>一家快遞公司希望降低其運輸成本和配送時間。目標是利用歷史GPS數據和訂單信息，為其配送車隊規劃出最優的每日配送路線。</p>,
            },
            {
                title: "提出假設", Icon: SparklesIcon, description: "我們猜測可能的原因是什麼？",
                content: <p>假設目前的路線規劃未充分考慮到實時路況和訂單的地理集中度，導致司機繞路和無效行駛時間過多。</p>,
            },
            {
                title: "數據分析與發現", Icon: ChartBarIcon, description: "數據告訴了我們什麼？",
                content: (
                    <>
                        <p>我們結合了地理信息系統 (GIS) 和優化算法（如旅行商問題的變體），對數據進行分析：</p>
                        <ul className="list-disc list-inside space-y-2 mt-2">
                           <li>發現司機平均有15%的行駛時間花在交通擁堵上。</li>
                           <li>通過對訂單進行地理聚類，可以將多個相近的訂單分配給同一輛車，減少車輛總行駛里程。</li>
                        </ul>
                    </>
                ),
            },
            {
                title: "結論與建議", Icon: PresentationChartLineIcon, description: "我們應該採取什麼行動？",
                content: (
                    <ul className="list-decimal list-inside space-y-2">
                        <li>引入一個新的路線規劃系統，該系統能整合實時交通數據。</li>
                        <li>在訂單分配階段，使用聚類算法來優化包裹分組。</li>
                        <li>實施後，預計能將總運輸成本降低12%，並提高準時送達率。</li>
                    </ul>
                ),
            }
        ],
    },
    {
        id: 10,
        title: "信用卡詐欺偵測",
        description: "建立一個機器學習模型，實時識別可能為欺詐的信用卡交易。",
        icon: "💳",
        steps: [
            {
                title: "定義問題", Icon: MagnifyingGlassIcon, description: "我們的目標是什麼？",
                content: <p>一家銀行需要一個自動化系統來檢測信用卡交易中的欺詐行為，以保護客戶並減少財務損失。模型的挑戰在於，欺詐交易在所有交易中佔比極小（數據不平衡）。</p>,
            },
            {
                title: "提出假設", Icon: SparklesIcon, description: "我們猜測可能的原因是什麼？",
                content: <p>假設欺詐交易在交易金額、交易地點的異常性、以及交易時間上會與正常交易有顯著不同。例如，短時間內在兩個相距很遠的地方發生交易，就很可疑。</p>,
            },
            {
                title: "數據分析與發現", Icon: ChartBarIcon, description: "數據告訴了我們什麼？",
                content: (
                    <>
                        <p>我們使用了一個包含數百萬筆交易的數據集，其中欺詐交易已被標記。由於數據不平衡，我們採用了「隨機森林」模型，並使用「SMOTE」技術來過採樣少數類（欺詐樣本）。</p>
                        <ul className="list-disc list-inside space-y-2 mt-2">
                           <li>模型在檢測欺詐交易方面的「召回率」(Recall) 達到了92%，這意味著它成功識別了絕大多數的真實欺詐行為。</li>
                           <li>「交易金額」和「與上次交易的時間差」是模型判斷中最重要的兩個特徵。</li>
                        </ul>
                    </>
                ),
            },
            {
                title: "結論與建議", Icon: PresentationChartLineIcon, description: "我們應該採取什麼行動？",
                content: (
                    <ul className="list-decimal list-inside space-y-2">
                        <li>將該模型部署到銀行的交易處理系統中。</li>
                        <li>對於被模型標記為高風險的交易，系統應自動觸發二次驗證（如發送驗證碼到用戶手機）。</li>
                        <li>定期用新的交易數據重新訓練模型，以應對不斷變化的欺詐手段。</li>
                    </ul>
                ),
            }
        ],
    },
];


const StepCard: React.FC<{
    step: number;
    title: string;
    description: string;
    Icon: React.FC<{ className?: string }>;
    children?: React.ReactNode;
}> = ({ step, title, description, Icon, children }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center mb-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">
                {step}
            </div>
            <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{description}</p>
            </div>
             <Icon className="w-8 h-8 text-blue-500 dark:text-blue-400 ml-auto" />
        </div>
        {children && <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">{children}</div>}
    </div>
);


const CaseStudyDetail: React.FC<{ caseStudy: CaseStudy; onBack: () => void; }> = ({ caseStudy, onBack }) => {
    return (
        <div className="animate-fade-in">
             <button
                onClick={onBack}
                className="mb-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                &larr; 返回案例列表
            </button>
            <div className="space-y-8">
                {caseStudy.steps.map((step, index) => (
                    <StepCard
                        key={index}
                        step={index + 1}
                        title={step.title}
                        description={step.description}
                        Icon={step.Icon}
                    >
                        {step.content}
                    </StepCard>
                ))}
            </div>
        </div>
    );
};

const CaseSelectorCard: React.FC<{ caseStudy: CaseStudy; onSelect: () => void; }> = ({ caseStudy, onSelect }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="flex-shrink-0 text-4xl mb-4">{caseStudy.icon}</div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{caseStudy.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm flex-grow mb-4">{caseStudy.description}</p>
        <button
            onClick={onSelect}
            className="mt-auto w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
            查看詳情
        </button>
    </div>
);


const BusinessCaseStudy: React.FC = () => {
    const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

    return (
        <ModuleContainer title="商業案例分析">
            {!selectedCase ? (
                 <>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 mb-8">
                        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                            理論需要透過實踐來驗證。這裡彙總了10個來自不同行業的真實商業場景，選擇一個您感興趣的案例，跟隨我們走過從定義問題到提出可行建議的完整數據分析流程，將之前所學的知識串聯起來。
                        </p>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {caseStudies.map(cs => (
                            <CaseSelectorCard key={cs.id} caseStudy={cs} onSelect={() => setSelectedCase(cs)} />
                        ))}
                    </div>
                </>
            ) : (
                <CaseStudyDetail caseStudy={selectedCase} onBack={() => setSelectedCase(null)} />
            )}
        </ModuleContainer>
    );
};

export default BusinessCaseStudy;
