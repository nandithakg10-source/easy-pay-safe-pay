'use strict';
/* EasyPay · SafePay: educational demo. No real payments. Rule-based scam checks are a demonstration only. */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const store={get(k,d){try{const v=localStorage.getItem(k);return v===null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};

/* ---------- Text in English and Kannada ---------- */
const I={en:{},kn:{}};
[
['skip','Skip to content','ವಿಷಯಕ್ಕೆ ಹೋಗಿ'],
['tagline','Safe digital payments made simple','ಸುರಕ್ಷಿತ ಡಿಜಿಟಲ್ ಪಾವತಿ, ಸರಳವಾಗಿ'],
['demo_banner','Practice app: no real money is sent. The scam checks are a simple demonstration, not a real security system.','ಇದು ಅಭ್ಯಾಸ ಆ್ಯಪ್: ನಿಜವಾದ ಹಣ ಕಳುಹಿಸಲಾಗುವುದಿಲ್ಲ. ವಂಚನೆ ಪರಿಶೀಲನೆ ಕೇವಲ ಸರಳ ಪ್ರದರ್ಶನ, ನಿಜವಾದ ಭದ್ರತಾ ವ್ಯವಸ್ಥೆಯಲ್ಲ.'],
['lang_l','Language','ಭಾಷೆ'],['fs_minus','Smaller text','ಚಿಕ್ಕ ಅಕ್ಷರ'],['fs_plus','Bigger text','ದೊಡ್ಡ ಅಕ್ಷರ'],['theme_l','Switch light or dark mode','ಬೆಳಕು ಅಥವಾ ಕತ್ತಲೆ ಮೋಡ್ ಬದಲಿಸಿ'],['nav_l','Main menu','ಮುಖ್ಯ ಮೆನು'],
['nav_home','Home','ಮುಖಪುಟ'],['nav_send','Send','ಕಳುಹಿಸಿ'],['nav_scan','Scan','ಸ್ಕ್ಯಾನ್'],['nav_alerts','Alerts','ಎಚ್ಚರಿಕೆ'],['nav_learn','Learn','ಕಲಿಯಿರಿ'],['nav_help','Help','ಸಹಾಯ'],
['read_page','Read this page aloud','ಈ ಪುಟವನ್ನು ಓದಿ ಹೇಳಿ'],['stop','Stop','ನಿಲ್ಲಿಸಿ'],
['no_kn_voice','Your device has no Kannada voice installed. Add one in your phone\'s text-to-speech settings.','ನಿಮ್ಮ ಸಾಧನದಲ್ಲಿ ಕನ್ನಡ ಧ್ವನಿ ಇಲ್ಲ. ಫೋನ್‌ನ ಟೆಕ್ಸ್ಟ್-ಟು-ಸ್ಪೀಚ್ ಸೆಟ್ಟಿಂಗ್‌ನಲ್ಲಿ ಕನ್ನಡ ಧ್ವನಿ ಸೇರಿಸಿ.'],
['no_tts','Voice is not supported in this browser.','ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಬೆಂಬಲವಿಲ್ಲ.'],
['hello','Namaste! What would you like to do today?','ನಮಸ್ಕಾರ! ಇಂದು ನೀವು ಏನು ಮಾಡಲು ಬಯಸುತ್ತೀರಿ?'],
['tile_send','Send Money','ಹಣ ಕಳುಹಿಸಿ'],['tile_send_d','Practice a payment step by step','ಹಂತ ಹಂತವಾಗಿ ಪಾವತಿ ಅಭ್ಯಾಸ ಮಾಡಿ'],
['tile_scan','Scan QR','QR ಸ್ಕ್ಯಾನ್ ಮಾಡಿ'],['tile_scan_d','Check a QR code before paying','ಪಾವತಿಸುವ ಮೊದಲು QR ಕೋಡ್ ಪರಿಶೀಲಿಸಿ'],
['tile_alerts','Scam Alerts','ವಂಚನೆ ಎಚ್ಚರಿಕೆಗಳು'],['tile_alerts_d','See common scams and check a message','ಸಾಮಾನ್ಯ ವಂಚನೆಗಳನ್ನು ನೋಡಿ, ಸಂದೇಶ ಪರಿಶೀಲಿಸಿ'],
['tile_help','Get Help','ಸಹಾಯ ಪಡೆಯಿರಿ'],['tile_help_d','Helplines and trusted people','ಸಹಾಯವಾಣಿ ಮತ್ತು ವಿಶ್ವಾಸಾರ್ಹ ವ್ಯಕ್ತಿಗಳು'],
['tip_title','Safety tip of the day','ಇಂದಿನ ಸುರಕ್ಷತಾ ಸಲಹೆ'],
['tip0','No bank or police officer will ever ask for your OTP or PIN.','ಯಾವುದೇ ಬ್ಯಾಂಕ್ ಅಥವಾ ಪೊಲೀಸ್ ಅಧಿಕಾರಿ ನಿಮ್ಮ OTP ಅಥವಾ ಪಿನ್ ಕೇಳುವುದಿಲ್ಲ.'],
['tip1','You need a PIN only to pay. To receive money, you never enter a PIN.','ಹಣ ಪಾವತಿಸಲು ಮಾತ್ರ ಪಿನ್ ಬೇಕು. ಹಣ ಸ್ವೀಕರಿಸಲು ಎಂದಿಗೂ ಪಿನ್ ಹಾಕಬೇಕಿಲ್ಲ.'],
['tip2','Police never arrest anyone over a video call. "Digital arrest" is always a scam.','ಪೊಲೀಸರು ವೀಡಿಯೊ ಕರೆಯಲ್ಲಿ ಯಾರನ್ನೂ ಬಂಧಿಸುವುದಿಲ್ಲ. "ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್" ಯಾವಾಗಲೂ ವಂಚನೆ.'],
['tip3','If someone rushes you, stop and call your family first.','ಯಾರಾದರೂ ಅವಸರ ಮಾಡಿದರೆ, ನಿಲ್ಲಿಸಿ ಮತ್ತು ಮೊದಲು ಕುಟುಂಬದವರಿಗೆ ಕರೆ ಮಾಡಿ.'],
['tip4','Never install an app because a caller asked you to.','ಕರೆ ಮಾಡಿದವರು ಹೇಳಿದರೆಂದು ಯಾವುದೇ ಆ್ಯಪ್ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಬೇಡಿ.'],
['l_rules','5 golden rules','5 ಸುವರ್ಣ ನಿಯಮಗಳು'],
['r1','Never share OTP, PIN or CVV.','OTP, ಪಿನ್ ಅಥವಾ CVV ಯಾರಿಗೂ ಹೇಳಬೇಡಿ.'],['r2','Paying needs a PIN. Receiving never does.','ಪಾವತಿಗೆ ಪಿನ್ ಬೇಕು. ಸ್ವೀಕರಿಸಲು ಬೇಡ.'],
['r3','Police and banks never ask for money on a call.','ಪೊಲೀಸರು ಮತ್ತು ಬ್ಯಾಂಕ್‌ಗಳು ಕರೆಯಲ್ಲಿ ಹಣ ಕೇಳುವುದಿಲ್ಲ.'],['r4','Do not install apps or tap links from strangers.','ಅಪರಿಚಿತರ ಆ್ಯಪ್ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಬೇಡಿ, ಲಿಂಕ್ ಒತ್ತಬೇಡಿ.'],['r5','If you feel rushed, stop and call family.','ಅವಸರ ಅನಿಸಿದರೆ ನಿಲ್ಲಿ, ಕುಟುಂಬದವರಿಗೆ ಕರೆ ಮಾಡಿ.'],
/* send */
['send_title','Send Money (practice)','ಹಣ ಕಳುಹಿಸಿ (ಅಭ್ಯಾಸ)'],['s1','1. Who','1. ಯಾರಿಗೆ'],['s2','2. Amount','2. ಮೊತ್ತ'],['s3','3. Confirm','3. ದೃಢೀಕರಿಸಿ'],
['rec_name','Recipient name','ಸ್ವೀಕರಿಸುವವರ ಹೆಸರು'],['rec_id','UPI ID or mobile number','UPI ಐಡಿ ಅಥವಾ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ'],['amount','Amount (₹)','ಮೊತ್ತ (₹)'],['note','Reason or message (optional)','ಕಾರಣ ಅಥವಾ ಸಂದೇಶ (ಐಚ್ಛಿಕ)'],
['next','Next','ಮುಂದೆ'],['back','Back','ಹಿಂದೆ'],['review','Review payment','ಪಾವತಿ ಪರಿಶೀಲಿಸಿ'],['cancel','Cancel','ರದ್ದುಮಾಡಿ'],
['confirm_title','Please check before you confirm','ದೃಢೀಕರಿಸುವ ಮೊದಲು ದಯವಿಟ್ಟು ಪರಿಶೀಲಿಸಿ'],['to','To','ಯಾರಿಗೆ'],['amt','Amount','ಮೊತ್ತ'],['id_l','UPI ID / mobile','UPI ಐಡಿ / ಮೊಬೈಲ್'],['note_l','Message','ಸಂದೇಶ'],
['confirm_btn','Confirm (practice)','ದೃಢೀಕರಿಸಿ (ಅಭ್ಯಾಸ)'],['ack_caution','I have checked with a family member or with the person myself.','ನಾನು ಕುಟುಂಬದವರೊಂದಿಗೆ ಅಥವಾ ಆ ವ್ಯಕ್ತಿಯೊಂದಿಗೆ ಪರಿಶೀಲಿಸಿದ್ದೇನೆ.'],
['success','Practice payment complete. No real money was sent.','ಅಭ್ಯಾಸ ಪಾವತಿ ಪೂರ್ಣ. ನಿಜವಾದ ಹಣ ಕಳುಹಿಸಿಲ್ಲ.'],['pin_note','In a real app you would now enter your UPI PIN. Never share it with anyone.','ನಿಜವಾದ ಆ್ಯಪ್‌ನಲ್ಲಿ ನೀವು ಈಗ UPI ಪಿನ್ ಹಾಕುತ್ತೀರಿ. ಅದನ್ನು ಯಾರಿಗೂ ಹೇಳಬೇಡಿ.'],['done_btn','Back to start','ಆರಂಭಕ್ಕೆ ಹಿಂತಿರುಗಿ'],
['err_id','Enter a valid UPI ID (like name@bank) or a 10-digit mobile number.','ಮಾನ್ಯ UPI ಐಡಿ (name@bank ರೀತಿ) ಅಥವಾ 10 ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ.'],['err_amt','Enter the amount in numbers, for example 500.','ಮೊತ್ತವನ್ನು ಅಂಕಿಗಳಲ್ಲಿ ನಮೂದಿಸಿ, ಉದಾ. 500.'],
['sample_ok','Fill a safe example','ಸುರಕ್ಷಿತ ಉದಾಹರಣೆ ತುಂಬಿ'],['sample_bad','Fill a scam example','ವಂಚನೆ ಉದಾಹರಣೆ ತುಂಬಿ'],
['v_safe','No warning signs found','ಯಾವುದೇ ಎಚ್ಚರಿಕೆ ಲಕ್ಷಣ ಕಂಡುಬಂದಿಲ್ಲ'],['v_caution','Be careful. Check first.','ಎಚ್ಚರಿಕೆ! ಮೊದಲು ಪರಿಶೀಲಿಸಿ.'],['v_danger','Likely scam. Do not pay.','ವಂಚನೆಯ ಸಾಧ್ಯತೆ ಹೆಚ್ಚು. ಪಾವತಿಸಬೇಡಿ.'],
['safe_note','This simple demo cannot prove a payment is safe. Always check the name shown in your UPI app.','ಈ ಸರಳ ಪ್ರದರ್ಶನ ಪಾವತಿ ಸುರಕ್ಷಿತ ಎಂದು ಸಾಬೀತು ಮಾಡಲಾರದು. ನಿಮ್ಮ UPI ಆ್ಯಪ್‌ನಲ್ಲಿ ತೋರುವ ಹೆಸರನ್ನು ಯಾವಾಗಲೂ ಪರಿಶೀಲಿಸಿ.'],['risk','Risk score','ಅಪಾಯ ಅಂಕ'],['why','Why','ಏಕೆ'],
/* scan */
['scan_title','Scan a QR code (practice)','QR ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ (ಅಭ್ಯಾಸ)'],['scan_hint','Point the camera at a QR code. Nothing is uploaded.','QR ಕೋಡ್ ಕಡೆಗೆ ಕ್ಯಾಮೆರಾ ತೋರಿಸಿ. ಏನೂ ಅಪ್‌ಲೋಡ್ ಆಗುವುದಿಲ್ಲ.'],
['start_cam','Start camera','ಕ್ಯಾಮೆರಾ ಆರಂಭಿಸಿ'],['stop_cam','Stop camera','ಕ್ಯಾಮೆರಾ ನಿಲ್ಲಿಸಿ'],['upload_qr','Or choose a QR picture','ಅಥವಾ QR ಚಿತ್ರ ಆಯ್ಕೆಮಾಡಿ'],['or_try','Or try a sample QR','ಅಥವಾ ಮಾದರಿ QR ಪ್ರಯತ್ನಿಸಿ'],
['sample_qr_ok','Shop QR (safe example)','ಅಂಗಡಿ QR (ಸುರಕ್ಷಿತ ಉದಾಹರಣೆ)'],['sample_qr_bad','Refund QR (scam example)','ರಿಫಂಡ್ QR (ವಂಚನೆ ಉದಾಹರಣೆ)'],
['cam_fail','Camera or QR reading is not available here. Use a picture or a sample QR.','ಕ್ಯಾಮೆರಾ ಅಥವಾ QR ಓದುವಿಕೆ ಇಲ್ಲಿ ಲಭ್ಯವಿಲ್ಲ. ಚಿತ್ರ ಅಥವಾ ಮಾದರಿ QR ಬಳಸಿ.'],['no_qr','No QR code found in this picture.','ಈ ಚಿತ್ರದಲ್ಲಿ QR ಕೋಡ್ ಕಂಡುಬಂದಿಲ್ಲ.'],
['qr_result','QR details','QR ವಿವರಗಳು'],['payee','Payee','ಸ್ವೀಕರಿಸುವವರು'],['not_upi','This QR is not a UPI payment code.','ಇದು UPI ಪಾವತಿ ಕೋಡ್ ಅಲ್ಲ.'],['use_send','Continue to Send Money','ಹಣ ಕಳುಹಿಸಲು ಮುಂದುವರಿಸಿ'],
/* alerts */
['alerts_title','Scam Alerts','ವಂಚನೆ ಎಚ್ಚರಿಕೆಗಳು'],['alerts_intro','Here are common scam messages. Tap Check to see how this demo spots them.','ಇವು ಸಾಮಾನ್ಯ ವಂಚನೆ ಸಂದೇಶಗಳು. ಈ ಪ್ರದರ್ಶನ ಅವನ್ನು ಹೇಗೆ ಗುರುತಿಸುತ್ತದೆ ಎಂದು ನೋಡಲು ‘ಪರಿಶೀಲಿಸಿ’ ಒತ್ತಿ.'],
['check_it','Check this message','ಈ ಸಂದೇಶ ಪರಿಶೀಲಿಸಿ'],['own_msg','Check your own message','ನಿಮ್ಮ ಸ್ವಂತ ಸಂದೇಶ ಪರಿಶೀಲಿಸಿ'],['paste_here','Paste a message or link here','ಸಂದೇಶ ಅಥವಾ ಲಿಂಕ್ ಇಲ್ಲಿ ಅಂಟಿಸಿ'],
['how_paste','How to paste: press and hold the message and tap Copy. Then press and hold in the box below and tap Paste.','ಅಂಟಿಸುವ ವಿಧಾನ: ಸಂದೇಶವನ್ನು ಒತ್ತಿ ಹಿಡಿದು ‘ಕಾಪಿ’ ಒತ್ತಿ. ನಂತರ ಕೆಳಗಿನ ಬಾಕ್ಸ್‌ನಲ್ಲಿ ಒತ್ತಿ ಹಿಡಿದು ‘ಪೇಸ್ಟ್’ ಒತ್ತಿ.'],
['paste_btn','Paste','ಅಂಟಿಸಿ'],['check_btn','Check','ಪರಿಶೀಲಿಸಿ'],['paste_fail','Your phone did not allow Paste. Press and hold in the box and tap Paste.','ಪೇಸ್ಟ್ ಮಾಡಲು ಅನುಮತಿ ಸಿಗಲಿಲ್ಲ. ಬಾಕ್ಸ್‌ನಲ್ಲಿ ಒತ್ತಿ ಹಿಡಿದು ‘ಪೇಸ್ಟ್’ ಒತ್ತಿ.'],['empty_msg','Paste a message first.','ಮೊದಲು ಸಂದೇಶ ಅಂಟಿಸಿ.'],
['al_danger','STOP! Likely scam','ನಿಲ್ಲಿ! ವಂಚನೆಯ ಸಾಧ್ಯತೆ'],['al_caution','WAIT! Be careful','ತಾಳಿ! ಎಚ್ಚರಿಕೆ'],
['act_danger','Do not pay. Do not share OTP or PIN. Call 1930 or your family.','ಪಾವತಿಸಬೇಡಿ. OTP ಅಥವಾ ಪಿನ್ ಹೇಳಬೇಡಿ. 1930 ಗೆ ಅಥವಾ ಕುಟುಂಬದವರಿಗೆ ಕರೆ ಮಾಡಿ.'],['act_caution','Ask a family member before you do anything.','ಏನನ್ನಾದರೂ ಮಾಡುವ ಮೊದಲು ಕುಟುಂಬದವರನ್ನು ಕೇಳಿ.'],
['close','I understand','ನನಗೆ ಅರ್ಥವಾಯಿತು'],['hear','Hear again','ಮತ್ತೆ ಕೇಳಿ'],
['d1t','"Digital arrest" call','"ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್" ಕರೆ'],['d2t','Fake KYC message','ನಕಲಿ KYC ಸಂದೇಶ'],['d3t','Lucky draw prize','ಲಕ್ಕಿ ಡ್ರಾ ಬಹುಮಾನ'],['d4t','Fake customer care','ನಕಲಿ ಗ್ರಾಹಕ ಸೇವೆ'],['d5t','"Mom, I am in trouble"','"ಅಮ್ಮಾ, ನಾನು ತೊಂದರೆಯಲ್ಲಿದ್ದೇನೆ"'],
/* learn */
['learn_title','Learn about digital payments','ಡಿಜಿಟಲ್ ಪಾವತಿಗಳ ಬಗ್ಗೆ ತಿಳಿಯಿರಿ'],
['l1t','What is UPI?','UPI ಎಂದರೇನು?'],['l1d','UPI lets you send money from your bank account using a phone. You use a UPI ID like name@bank.','UPI ಮೂಲಕ ಫೋನ್ ಬಳಸಿ ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆಯಿಂದ ಹಣ ಕಳುಹಿಸಬಹುದು. name@bank ರೀತಿಯ UPI ಐಡಿ ಇರುತ್ತದೆ.'],
['l2t','What is a UPI PIN?','UPI ಪಿನ್ ಎಂದರೇನು?'],['l2d','A secret number you enter only when sending money. Never tell it to anyone, not even the bank.','ಹಣ ಕಳುಹಿಸುವಾಗ ಮಾತ್ರ ಹಾಕುವ ರಹಸ್ಯ ಸಂಖ್ಯೆ. ಬ್ಯಾಂಕ್‌ನವರಿಗೂ ಸೇರಿ ಯಾರಿಗೂ ಹೇಳಬೇಡಿ.'],
['l3t','What does scanning a QR do?','QR ಸ್ಕ್ಯಾನ್ ಮಾಡಿದರೆ ಏನಾಗುತ್ತದೆ?'],['l3d','It usually opens a payment to someone. You never need to scan a QR code to receive money.','ಸಾಮಾನ್ಯವಾಗಿ ಯಾರಿಗೋ ಪಾವತಿ ತೆರೆಯುತ್ತದೆ. ಹಣ ಸ್ವೀಕರಿಸಲು QR ಸ್ಕ್ಯಾನ್ ಮಾಡುವ ಅಗತ್ಯವೇ ಇಲ್ಲ.'],
['l4t','What is a collect request?','ಕಲೆಕ್ಟ್ ರಿಕ್ವೆಸ್ಟ್ ಎಂದರೇನು?'],['l4d','It is a request asking you to pay. If you approve it with your PIN, your money leaves. Decline requests you do not know.','ಇದು ನಿಮ್ಮನ್ನು ಪಾವತಿಸಲು ಕೇಳುವ ವಿನಂತಿ. ಪಿನ್‌ನಿಂದ ಒಪ್ಪಿದರೆ ನಿಮ್ಮ ಹಣ ಹೋಗುತ್ತದೆ. ಗೊತ್ತಿಲ್ಲದ ವಿನಂತಿಗಳನ್ನು ತಿರಸ್ಕರಿಸಿ.'],
/* help */
['help_title','Help and trusted people','ಸಹಾಯ ಮತ್ತು ವಿಶ್ವಾಸಾರ್ಹ ವ್ಯಕ್ತಿಗಳು'],['h1930','Cyber fraud helpline 1930','ಸೈಬರ್ ವಂಚನೆ ಸಹಾಯವಾಣಿ 1930'],['h14567','Senior citizens helpline 14567','ಹಿರಿಯ ನಾಗರಿಕರ ಸಹಾಯವಾಣಿ 14567'],['h112','Emergency 112','ತುರ್ತು ಸೇವೆ 112'],['portal','Report online: cybercrime.gov.in','ಆನ್‌ಲೈನ್ ದೂರು: cybercrime.gov.in'],
['lost_title','If money is already lost','ಹಣ ಈಗಾಗಲೇ ಹೋಗಿದ್ದರೆ'],['lost_d','Call 1930 at once, tell your bank, and report at cybercrime.gov.in.','ತಕ್ಷಣ 1930 ಗೆ ಕರೆ ಮಾಡಿ, ಬ್ಯಾಂಕ್‌ಗೆ ತಿಳಿಸಿ, cybercrime.gov.in ನಲ್ಲಿ ದೂರು ನೀಡಿ.'],
['trusted_title','My trusted people','ನನ್ನ ವಿಶ್ವಾಸಾರ್ಹ ವ್ಯಕ್ತಿಗಳು'],['trusted_note','Saved only on this device. Do not store bank details here.','ಈ ಸಾಧನದಲ್ಲಿ ಮಾತ್ರ ಉಳಿಸಲಾಗುತ್ತದೆ. ಇಲ್ಲಿ ಬ್ಯಾಂಕ್ ವಿವರಗಳನ್ನು ಉಳಿಸಬೇಡಿ.'],
['t_name','Name','ಹೆಸರು'],['t_phone','Phone number (10 digits)','ಫೋನ್ ಸಂಖ್ಯೆ (10 ಅಂಕಿ)'],['add','Add person','ವ್ಯಕ್ತಿಯನ್ನು ಸೇರಿಸಿ'],['call','Call','ಕರೆ'],['sms','Message','ಸಂದೇಶ'],['remove','Remove','ತೆಗೆಯಿರಿ'],['none_yet','No trusted people added yet.','ಇನ್ನೂ ಯಾರನ್ನೂ ಸೇರಿಸಿಲ್ಲ.'],
['err_tc','Enter a name and a 10-digit number.','ಹೆಸರು ಮತ್ತು 10 ಅಂಕಿಯ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ.'],['sms_body','Please help me check something before I pay.','ನಾನು ಪಾವತಿಸುವ ಮೊದಲು ಒಂದು ವಿಷಯ ಪರಿಶೀಲಿಸಲು ದಯವಿಟ್ಟು ಸಹಾಯ ಮಾಡಿ.'],
['footer','EasyPay · SafePay is an educational demonstration. It does not connect to any bank or UPI service and does not process real payments. Its scam checks are simple rules, not a production security system.','EasyPay · SafePay ಒಂದು ಶೈಕ್ಷಣಿಕ ಪ್ರದರ್ಶನ. ಇದು ಯಾವುದೇ ಬ್ಯಾಂಕ್ ಅಥವಾ UPI ಸೇವೆಗೆ ಸಂಪರ್ಕ ಹೊಂದಿಲ್ಲ, ನಿಜವಾದ ಪಾವತಿಗಳನ್ನು ಸಂಸ್ಕರಿಸುವುದಿಲ್ಲ. ಇದರ ವಂಚನೆ ಪರಿಶೀಲನೆ ಸರಳ ನಿಯಮಗಳು ಮಾತ್ರ, ನಿಜವಾದ ಭದ್ರತಾ ವ್ಯವಸ್ಥೆಯಲ್ಲ.']
].forEach(([k,e,n])=>{I.en[k]=e;I.kn[k]=n});
let lang=store.get('ep_lang','en');
const t=k=>I[lang][k]??I.en[k]??k;

/* ---------- Demo scam messages (analysis uses the English text) ---------- */
const DEMOS=[
['d1t','This is CBI. A parcel in your name has illegal items. You are under digital arrest. Stay on this video call, do not tell anyone, and transfer Rs 50,000 to clear your name.','ಇದು CBI. ನಿಮ್ಮ ಹೆಸರಿನ ಪಾರ್ಸೆಲ್‌ನಲ್ಲಿ ಅಕ್ರಮ ವಸ್ತುಗಳಿವೆ. ನೀವು ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್‌ನಲ್ಲಿದ್ದೀರಿ. ಈ ವೀಡಿಯೊ ಕರೆಯಲ್ಲೇ ಇರಿ, ಯಾರಿಗೂ ಹೇಳಬೇಡಿ, ನಿಮ್ಮ ಹೆಸರು ಕ್ಲಿಯರ್ ಮಾಡಲು ₹50,000 ವರ್ಗಾಯಿಸಿ.'],
['d2t','Dear customer, your bank KYC expires today and your account will be blocked. Update now: http://bit.ly/kyc-update and share the OTP.','ಆತ್ಮೀಯ ಗ್ರಾಹಕರೇ, ನಿಮ್ಮ ಬ್ಯಾಂಕ್ KYC ಇಂದು ಮುಕ್ತಾಯವಾಗುತ್ತದೆ, ಖಾತೆ ಬ್ಲಾಕ್ ಆಗುತ್ತದೆ. ಈಗಲೇ ಅಪ್‌ಡೇಟ್ ಮಾಡಿ: http://bit.ly/kyc-update ಮತ್ತು OTP ಹಂಚಿಕೊಳ್ಳಿ.'],
['d3t','Congratulations! You won a lucky draw prize of Rs 25 lakh. Pay a processing fee of Rs 4,999 to claim your prize.','ಅಭಿನಂದನೆಗಳು! ನೀವು ₹25 ಲಕ್ಷ ಲಕ್ಕಿ ಡ್ರಾ ಬಹುಮಾನ ಗೆದ್ದಿದ್ದೀರಿ. ಬಹುಮಾನ ಪಡೆಯಲು ₹4,999 ಪ್ರೊಸೆಸಿಂಗ್ ಶುಲ್ಕ ಪಾವತಿಸಿ.'],
['d4t','Customer care here. To get your refund, install AnyDesk and tell me the code on your screen. Enter your UPI PIN to receive the money.','ಕಸ್ಟಮರ್ ಕೇರ್ ಇಲ್ಲಿದೆ. ರಿಫಂಡ್ ಪಡೆಯಲು AnyDesk ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ ಮತ್ತು ಪರದೆಯ ಕೋಡ್ ಹೇಳಿ. ಹಣ ಸ್ವೀಕರಿಸಲು ನಿಮ್ಮ UPI ಪಿನ್ ಹಾಕಿ.'],
['d5t','Mom, I changed my phone number. I am in trouble and need Rs 20,000 urgently. Please do not tell Dad. Send to this UPI ID right now.','ಅಮ್ಮಾ, ನನ್ನ ಫೋನ್ ನಂಬರ್ ಬದಲಾಗಿದೆ. ನಾನು ತೊಂದರೆಯಲ್ಲಿದ್ದೇನೆ, ತುರ್ತಾಗಿ ₹20,000 ಬೇಕು. ಅಪ್ಪನಿಗೆ ಹೇಳಬೇಡಿ. ಈ UPI ಐಡಿಗೆ ಈಗಲೇ ಕಳುಹಿಸಿ.']
];
const QR_SAMPLES={ok:'upi://pay?pa=raviStores@oksbi&pn=Ravi%20Stores&am=250&tn=Groceries',bad:'upi://pay?pa=sbi.refund@ybl&pn=SBI%20Refund%20Desk&am=4999&tn=Scan%20to%20receive%20refund'};

/* ---------- Simple rule-based checker (demonstration only) ---------- */
const RU=[
[/otp|one[- ]?time password|upi pin|atm pin|cvv|ಓಟಿಪಿ|ಪಿನ್/i,3,'Asks for a secret code. Banks never ask for your OTP, PIN or CVV.','ರಹಸ್ಯ ಕೋಡ್ ಕೇಳುತ್ತಿದೆ. ಬ್ಯಾಂಕ್‌ಗಳು OTP, ಪಿನ್ ಅಥವಾ CVV ಎಂದಿಗೂ ಕೇಳುವುದಿಲ್ಲ.'],
[/anydesk|teamviewer|quick ?support|screen ?shar|remote (access|support)|install (this|the) app|\.apk|ಇನ್‌ಸ್ಟಾಲ್/i,4,'Asks you to install an app or share your screen. This lets thieves control your phone.','ಆ್ಯಪ್ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಲು ಅಥವಾ ಪರದೆ ಹಂಚಲು ಕೇಳುತ್ತಿದೆ. ಇದರಿಂದ ಕಳ್ಳರು ನಿಮ್ಮ ಫೋನ್ ನಿಯಂತ್ರಿಸಬಹುದು.'],
[/digital arrest|cbi|customs|narcotics|police|arrest|warrant|court|illegal (items|parcel)|ಅರೆಸ್ಟ್|ಪೊಲೀಸ್|ಬಂಧ/i,3,'Claims to be police or an officer. Real officers never take money over a call.','ಪೊಲೀಸ್ ಅಥವಾ ಅಧಿಕಾರಿ ಎಂದು ಹೇಳುತ್ತಿದೆ. ನಿಜವಾದ ಅಧಿಕಾರಿಗಳು ಕರೆಯಲ್ಲಿ ಹಣ ಕೇಳುವುದಿಲ್ಲ.'],
[/urgent|immediately|right now|within \d+ ?(hour|hr|min)|last chance|expire|suspend|blocked|disconnect|ತುರ್ತು|ತಕ್ಷಣ|ಈಗಲೇ|ಬ್ಲಾಕ್/i,2,'Creates fear and hurry so you cannot think.','ಭಯ ಮತ್ತು ಅವಸರ ಹುಟ್ಟಿಸಿ ನೀವು ಯೋಚಿಸದಂತೆ ಮಾಡುತ್ತಿದೆ.'],
[/kyc|pan (card )?(update|verif)|aadhaar.{0,20}(update|link|verif)|update your (bank|account)/i,2,'Fake KYC or account update. Banks do not ask for this by SMS or link.','ನಕಲಿ KYC ಅಥವಾ ಖಾತೆ ಅಪ್‌ಡೇಟ್. ಬ್ಯಾಂಕ್‌ಗಳು SMS ಅಥವಾ ಲಿಂಕ್ ಮೂಲಕ ಇದನ್ನು ಕೇಳುವುದಿಲ್ಲ.'],
[/lottery|lucky draw|you (have )?won|winner|prize|cashback|reward points|free gift|ಲಾಟರಿ|ಬಹುಮಾನ|ಲಕ್ಕಿ ಡ್ರಾ/i,2,'Prize or reward offer. You cannot win a contest you never entered.','ಬಹುಮಾನದ ಆಮಿಷ. ನೀವು ಭಾಗವಹಿಸದ ಸ್ಪರ್ಧೆಯನ್ನು ಗೆಲ್ಲಲು ಸಾಧ್ಯವಿಲ್ಲ.'],
[/(registration|processing|release|claim) fee|pay .{0,30}(to receive|to release|to claim)|ಶುಲ್ಕ/i,4,'Asks you to pay first to receive money or a prize. This is always a scam.','ಹಣ ಅಥವಾ ಬಹುಮಾನ ಪಡೆಯಲು ಮೊದಲು ಹಣ ಕೇಳುತ್ತಿದೆ. ಇದು ಯಾವಾಗಲೂ ವಂಚನೆ.'],
[/collect request|request money|scan (this )?qr.{0,30}receive|(enter|put) (your )?(upi )?pin to receive|scan to receive/i,4,'Receiving money never needs a PIN or a QR scan. Only paying does.','ಹಣ ಸ್ವೀಕರಿಸಲು ಪಿನ್ ಅಥವಾ QR ಸ್ಕ್ಯಾನ್ ಬೇಕಿಲ್ಲ. ಪಾವತಿಸಲು ಮಾತ್ರ ಬೇಕು.'],
[/do not tell|don.t tell|keep (this )?secret|confidential|ಯಾರಿಗೂ ಹೇಳಬೇಡಿ|ಹೇಳಬೇಡ/i,3,'Tells you to keep it secret. Always tell a family member.','ರಹಸ್ಯವಾಗಿಡಲು ಹೇಳುತ್ತಿದೆ. ಯಾವಾಗಲೂ ಕುಟುಂಬದವರಿಗೆ ಹೇಳಿ.'],
[/(changed|new) (my )?(phone )?number|lost my phone|i am in trouble|ನಂಬರ್ ಬದಲಾಗಿದೆ|ತೊಂದರೆಯಲ್ಲಿ/i,2,'A relative in trouble on a new number is a common trick. Call them on their old number.','ಹೊಸ ನಂಬರ್‌ನಿಂದ ಸಂಬಂಧಿ ತೊಂದರೆಯಲ್ಲಿದ್ದಾರೆ ಎನ್ನುವುದು ಸಾಮಾನ್ಯ ಮೋಸ. ಅವರ ಹಳೆಯ ನಂಬರ್‌ಗೆ ಕರೆ ಮಾಡಿ.'],
[/work from home|part[- ]?time job|earn .{0,25}(per day|daily|hour)|guaranteed (return|profit)|double your/i,2,'Too-good-to-be-true job or investment offer.','ನಂಬಲಸಾಧ್ಯ ಉದ್ಯೋಗ ಅಥವಾ ಹೂಡಿಕೆಯ ಆಮಿಷ.'],
[/bit\.ly|tinyurl|cutt\.ly|goo\.gl|t\.co\/|rb\.gy|\.xyz|\.top|\.click|\.icu/i,3,'Shortened or unusual link. Do not tap it.','ಚಿಕ್ಕ ಅಥವಾ ಅಸಾಮಾನ್ಯ ಲಿಂಕ್. ಅದನ್ನು ಒತ್ತಬೇಡಿ.'],
[/https?:\/\/|www\./i,1,'Contains a link. Open your bank app yourself instead.','ಲಿಂಕ್ ಇದೆ. ಬದಲಿಗೆ ನೀವೇ ಬ್ಯಾಂಕ್ ಆ್ಯಪ್ ತೆರೆಯಿರಿ.']
];
const HD='oksbi okaxis okhdfcbank okicici ybl ibl axl paytm apl upi sbi hdfcbank icici axisbank postbank airtel jio fbl pnb kotak unionbank cnrb idfcbank indus yesbank federal freecharge ikwik rbl dbs aubank boi idbi ubi psb kvb tmb cub karb sib jkb'.split(' ');
function analyse({id='',amount=0,text=''}){const S=[];
  if(id.includes('@')){const[l,h]=id.toLowerCase().split('@');
    if(!HD.includes(h))S.push([3,'The part after @ is not a known bank or app handle.','@ ನಂತರದ ಭಾಗ ಗೊತ್ತಿರುವ ಬ್ಯಾಂಕ್ ಅಥವಾ ಆ್ಯಪ್‌ನ ಹ್ಯಾಂಡಲ್ ಅಲ್ಲ.']);
    if(/refund|kyc|lottery|prize|reward|support|care|helpdesk|claim|winner|cashback|verify|official|govt|police|cbi|customs|tax/.test(l))S.push([5,'This ID has words like refund, KYC or support. Real banks do not use IDs like this.','ಈ ಐಡಿಯಲ್ಲಿ ರಿಫಂಡ್, KYC ಅಥವಾ ಸಪೋರ್ಟ್ ಎಂಬ ಪದಗಳಿವೆ. ನಿಜವಾದ ಬ್ಯಾಂಕ್‌ಗಳು ಇಂತಹ ಐಡಿ ಬಳಸುವುದಿಲ್ಲ.'])}
  else if(id&&!/^[6-9]/.test(id))S.push([3,'Indian mobile numbers start with 6, 7, 8 or 9.','ಭಾರತೀಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಗಳು 6, 7, 8 ಅಥವಾ 9 ರಿಂದ ಪ್ರಾರಂಭವಾಗುತ್ತವೆ.']);
  if(amount>=50000)S.push([2,'This is a large amount. Confirm with family first.','ಇದು ದೊಡ್ಡ ಮೊತ್ತ. ಮೊದಲು ಕುಟುಂಬದವರೊಂದಿಗೆ ದೃಢಪಡಿಸಿ.']);
  RU.forEach(([re,w,en,kn])=>{if(re.test(text))S.push([w,en,kn])});
  S.sort((a,b)=>b[0]-a[0]);const sc=Math.min(100,S.reduce((q,x)=>q+x[0],0)*7);
  return{S,sc,lv:sc>=35?'danger':sc>=14?'caution':'safe'}}
function verdictHTML(R){const lines=R.S.slice(0,4).map(x=>`<li>${esc(lang=='kn'?x[2]:x[1])}</li>`).join('');
  return `<div class="v ${R.lv}"><h3>${{safe:'✅',caution:'⚠️',danger:'⛔'}[R.lv]} ${esc(t('v_'+R.lv))}</h3><div class="meter"><i data-w="${R.sc}"></i></div><p>${esc(t('risk'))}: <b>${R.sc}/100</b></p>${lines?`<p><b>${esc(t('why'))}</b></p><ul>${lines}</ul>`:''}${R.lv=='safe'?`<p>${esc(t('safe_note'))}</p>`:''}</div>`}
function paintMeters(root){$$('.meter i',root).forEach(i=>{i.style.width=i.dataset.w+'%'})}

/* ---------- Voice (browser text-to-speech, free) ---------- */
const tts='speechSynthesis' in window;
function speak(text){if(!tts){toast(t('no_tts'));return}
  const voices=speechSynthesis.getVoices(),code=lang=='kn'?'kn-IN':'en-IN';
  let v=voices.find(x=>x.lang.replace('_','-').toLowerCase()==code.toLowerCase())||voices.find(x=>x.lang.toLowerCase().startsWith(code.slice(0,2)));
  if(lang=='kn'&&!v&&voices.length){toast(t('no_kn_voice'));return}
  speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang=code;if(v)u.voice=v;u.rate=.9;speechSynthesis.speak(u)}
function stopSpeak(){if(tts)speechSynthesis.cancel()}
function pageText(){const v=$('.view:not([hidden])');if(!v)return'';const c=v.cloneNode(true);$$('button,input,textarea,video,.reticle,.meter',c).forEach(n=>n.remove());return c.textContent.replace(/\s+/g,' ').trim()}
let toastT;function toast(m){const e=$('#toast');e.textContent=m;e.classList.add('on');clearTimeout(toastT);toastT=setTimeout(()=>e.classList.remove('on'),5000)}

/* ---------- Navigation ---------- */
const VIEWS=['home','send','scan','alerts','learn','help'];
function show(id){if(!VIEWS.includes(id))id='home';
  VIEWS.forEach(v=>{$('#'+v).hidden=v!=id});
  $$('.nav a').forEach(a=>{a.dataset.view==id?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current')});
  if(id!='scan')camStop();stopSpeak();scrollTo(0,0);const h=$('#h-'+id);if(h)h.focus({preventScroll:true})}
addEventListener('hashchange',()=>show(location.hash.slice(1)));

/* ---------- Language, text size, theme ---------- */
function applyLang(){document.documentElement.lang=lang=='kn'?'kn':'en';
  $$('[data-i18n]').forEach(e=>{e.textContent=t(e.dataset.i18n)});
  $$('[data-i18n-aria]').forEach(e=>{e.setAttribute('aria-label',t(e.dataset.i18nAria))});
  $('#lang-en').setAttribute('aria-pressed',lang=='en');$('#lang-kn').setAttribute('aria-pressed',lang=='kn');
  document.title='EasyPay · SafePay';renderAll()}
function renderAll(){
  $('#tip').textContent=t('tip'+(new Date().getDate()%5));
  $$('#rulesHome,#rulesLearn').forEach(o=>{o.innerHTML=[1,2,3,4,5].map(i=>`<li>${esc(t('r'+i))}</li>`).join('')});
  $('#learnList').innerHTML=[1,2,3,4].map(i=>`<details${i==1?' open':''}><summary>${esc(t('l'+i+'t'))}</summary><p>${esc(t('l'+i+'d'))}</p></details>`).join('');
  $('#demoList').innerHTML=DEMOS.map((d,i)=>`<div class="card"><h3>${esc(t(d[0]))}</h3><p class="msg">${esc(lang=='kn'?d[2]:d[1])}</p><button class="btn" data-act="demo" data-i="${i}">${esc(t('check_it'))}</button><div id="dout${i}" aria-live="polite"></div></div>`).join('');
  renderTrusted();if(step==3)buildConfirm();if(lastQR)showQR(lastQR)}

/* ---------- Send money demonstration ---------- */
let step=1,SD={name:'',id:'',amt:0,note:''},RES=null;
function sendShow(){$$('.sstep').forEach(e=>{e.hidden=+e.dataset.s!=step});$$('#sendsteps li').forEach(li=>li.classList.toggle('on',+li.dataset.s==step));$('#sDone').hidden=true;if(step==3)buildConfirm()}
const validId=v=>/^[a-z0-9._-]{2,}@[a-z]{2,}$/i.test(v)||/^[6-9]\d{9}$/.test(v)||/^\d{10}$/.test(v);
function buildConfirm(){RES=analyse({id:SD.id,amount:SD.amt,text:SD.note+' '+SD.name});
  $('#sum').innerHTML=`<dt>${esc(t('to'))}</dt><dd>${esc(SD.name||'—')}</dd><dt>${esc(t('id_l'))}</dt><dd>${esc(SD.id)}</dd><dt>${esc(t('amt'))}</dt><dd>₹${SD.amt.toLocaleString('en-IN')}</dd>${SD.note?`<dt>${esc(t('note_l'))}</dt><dd>${esc(SD.note)}</dd>`:''}`;
  $('#sVerdict').innerHTML=verdictHTML(RES);paintMeters($('#sVerdict'));
  $('#ackWrap').hidden=RES.lv!='caution';$('#ack').checked=false;
  $('#sConfirm').hidden=RES.lv=='danger';$('#sConfirm').disabled=RES.lv=='caution';$('#sCall').hidden=RES.lv!='danger'}
function resetSend(){step=1;SD={name:'',id:'',amt:0,note:''};['sName','sId','sAmt','sNote'].forEach(i=>$('#'+i).value='');$('#e1').textContent=$('#e2').textContent='';sendShow()}

/* ---------- Alert dialog ---------- */
let lastFocus=null,alertMsg='';
function showAlert(R){if(R.lv=='safe')return;const d=R.lv=='danger';
  $('.abox').className='abox '+R.lv;$('#al-i').textContent=d?'⛔':'⚠️';$('#al-t').textContent=t(d?'al_danger':'al_caution');
  $('#al-d').textContent=R.S[0]?(lang=='kn'?R.S[0][2]:R.S[0][1]):'';$('#al-a').textContent=t(d?'act_danger':'act_caution');
  alertMsg=[$('#al-t').textContent,$('#al-d').textContent,$('#al-a').textContent].join('. ');
  lastFocus=document.activeElement;$('#alert').hidden=false;$('#al-close').focus();
  try{navigator.vibrate&&navigator.vibrate(d?[500,200,500,200,800]:[300,150,300])}catch(e){}speak(alertMsg)}
function closeAlert(){$('#alert').hidden=true;stopSpeak();if(lastFocus)lastFocus.focus()}
addEventListener('keydown',e=>{if(e.key=='Escape'&&!$('#alert').hidden)closeAlert()});

/* ---------- QR scanning ---------- */
let stream=null,timer=null,lastQR=null;
function camStop(){clearInterval(timer);timer=null;if(stream){stream.getTracks().forEach(x=>x.stop());stream=null}const v=$('#cam');if(v)v.srcObject=null}
async function camStart(){const er=$('#camErr');er.textContent='';
  if(!('BarcodeDetector' in window)||!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){er.textContent=t('cam_fail');return}
  try{camStop();stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'}});const v=$('#cam');v.srcObject=stream;await v.play();
    const det=new BarcodeDetector({formats:['qr_code']});
    timer=setInterval(async()=>{try{const r=await det.detect(v);if(r.length){camStop();handleQR(r[0].rawValue)}}catch(e){}},400)}
  catch(e){camStop();er.textContent=t('cam_fail')}}
async function qrFile(f){if(!f)return;$('#camErr').textContent='';
  try{const r=await new BarcodeDetector({formats:['qr_code']}).detect(await createImageBitmap(f));if(r.length)handleQR(r[0].rawValue);else $('#camErr').textContent=t('no_qr')}
  catch(e){$('#camErr').textContent=t('cam_fail')}}
function parseQR(raw){if(/^upi:\/\/pay/i.test(raw)){const q=new URLSearchParams(raw.split('?')[1]||'');return{raw,upi:true,pa:q.get('pa')||'',pn:q.get('pn')||'',am:q.get('am')||'',tn:q.get('tn')||''}}return{raw,upi:false}}
function handleQR(raw){lastQR=parseQR(String(raw).slice(0,500));showQR(lastQR,true)}
function showQR(Q,alertIt){let R,h;
  if(Q.upi){R=analyse({id:Q.pa,amount:+Q.am||0,text:Q.pn+' '+Q.tn});
    h=`<div class="card"><h3>${esc(t('qr_result'))}</h3><dl class="sum"><dt>${esc(t('payee'))}</dt><dd>${esc(Q.pn||'—')}</dd><dt>${esc(t('id_l'))}</dt><dd>${esc(Q.pa)}</dd>${Q.am?`<dt>${esc(t('amt'))}</dt><dd>₹${esc(Q.am)}</dd>`:''}${Q.tn?`<dt>${esc(t('note_l'))}</dt><dd>${esc(Q.tn)}</dd>`:''}</dl></div>`+verdictHTML(R)+`<button class="btn big" data-act="useQR">${esc(t('use_send'))}</button>`}
  else{R=analyse({text:Q.raw});h=`<div class="card"><p>${esc(t('not_upi'))}</p><p class="msg">${esc(Q.raw)}</p></div>`+verdictHTML(R)}
  const o=$('#qrOut');o.innerHTML=h;paintMeters(o);if(alertIt)showAlert(R)}

/* ---------- Trusted contacts ---------- */
function renderTrusted(){const L=store.get('ep_tc',[]);
  $('#tcList').innerHTML=L.length?L.map((c,i)=>`<li><span><b>${esc(c.n)}</b> ${esc(c.p)}</span><span><a class="btn" href="tel:${esc(c.p)}">☎ ${esc(t('call'))}</a><a class="btn alt" href="sms:${esc(c.p)}?body=${encodeURIComponent(t('sms_body'))}">✉ ${esc(t('sms'))}</a><button class="btn alt" data-act="delTc" data-i="${i}">${esc(t('remove'))}</button></span></li>`).join(''):`<li>${esc(t('none_yet'))}</li>`}

/* ---------- Actions (no inline handlers, so a strict CSP works) ---------- */
const A={
lang(b){lang=b.dataset.v;store.set('ep_lang',lang);applyLang()},
fs(b){const n=Math.min(28,Math.max(16,(store.get('ep_fs',20))+2*(+b.dataset.v)));store.set('ep_fs',n);document.documentElement.style.fontSize=n+'px'},
theme(){const d=document.documentElement,n=d.dataset.theme=='dark'?'light':'dark';d.dataset.theme=n;store.set('ep_theme',n)},
speak(){speak(pageText())},stop(){stopSpeak()},
fillOk(){$('#sName').value='Ramesh Kumar';$('#sId').value='ramesh@oksbi';$('#sAmt').value='500';$('#sNote').value='Vegetables'},
fillBad(){$('#sName').value='SBI Refund Desk';$('#sId').value='sbi.refund@ybl';$('#sAmt').value='4999';$('#sNote').value='Urgent KYC. Do not tell anyone. Share OTP to receive refund.'},
next1(){const id=$('#sId').value.trim();if(!validId(id)){$('#e1').textContent=t('err_id');return}$('#e1').textContent='';SD.name=$('#sName').value.trim();SD.id=id;step=2;sendShow()},
next2(){const a=Number($('#sAmt').value.replace(/,/g,''));if(!(a>0&&a<=1e7)){$('#e2').textContent=t('err_amt');return}$('#e2').textContent='';SD.amt=a;SD.note=$('#sNote').value.trim().slice(0,300);step=3;sendShow();if(RES&&RES.lv!='safe')showAlert(RES)},
back(){step=Math.max(1,step-1);sendShow()},
confirm(){if(!RES||RES.lv=='danger')return;$$('.sstep').forEach(e=>e.hidden=true);$('#sDone').hidden=false;speak(t('success'))},
cancel(){resetSend()},
camStart,camStop,
qrSample(b){handleQR(QR_SAMPLES[b.dataset.v])},
useQR(){const Q=lastQR;if(!Q||!Q.upi)return;location.hash='#send';resetSend();$('#sName').value=Q.pn;$('#sId').value=Q.pa;$('#sAmt').value=Q.am;$('#sNote').value=Q.tn},
demo(b){const i=+b.dataset.i,R=analyse({text:DEMOS[i][1]});const o=$('#dout'+i);o.innerHTML=verdictHTML(R);paintMeters(o);showAlert(R)},
ownCheck(){const x=$('#ownText').value.trim(),o=$('#ownOut');if(!x){o.innerHTML=`<p class="err">${esc(t('empty_msg'))}</p>`;return}const R=analyse({text:x.slice(0,2000)});o.innerHTML=verdictHTML(R);paintMeters(o);showAlert(R)},
async paste(){try{const x=await navigator.clipboard.readText();if(!x)throw 0;$('#ownText').value=x}catch(e){toast(t('paste_fail'))}},
alertClose:closeAlert,alertHear(){speak(alertMsg)},
addTc(){const n=$('#tcName').value.trim().slice(0,40),p=$('#tcPhone').value.replace(/\s/g,'');if(!n||!/^\d{10}$/.test(p)){$('#tcErr').textContent=t('err_tc');return}$('#tcErr').textContent='';const L=store.get('ep_tc',[]);L.push({n,p});store.set('ep_tc',L.slice(-5));$('#tcName').value=$('#tcPhone').value='';renderTrusted()},
delTc(b){const L=store.get('ep_tc',[]);L.splice(+b.dataset.i,1);store.set('ep_tc',L);renderTrusted()}
};
document.addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(b&&A[b.dataset.act])A[b.dataset.act](b)});
$('#ack').addEventListener('change',e=>{$('#sConfirm').disabled=!e.target.checked});
$('#qrFile').addEventListener('change',e=>{qrFile(e.target.files[0]);e.target.value=''});

/* ---------- Start ---------- */
(function init(){const th=store.get('ep_theme',matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.dataset.theme=th;
  document.documentElement.style.fontSize=store.get('ep_fs',20)+'px';applyLang();sendShow();show(location.hash.slice(1)||'home')})();
