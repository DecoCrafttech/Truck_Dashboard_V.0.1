import { IoHomeOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { RiMenuFoldLine } from "react-icons/ri";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { LuPlus } from "react-icons/lu";
import { MdEdit } from "react-icons/md";
import { FaIndianRupeeSign } from "react-icons/fa6";



const homeIcon = <IoHomeOutline className="fs-5" />
const logoutLocon = <CiLogout className="fs-5" />
const menuIcon = <RiMenuFoldLine className="fs-5" />
const deleteIcon = <MdOutlineDeleteOutline className="fs-5 text-danger" />
const reactEditIcon = <MdEdit className="fs-4" />
const reactPlusIcon = <LuPlus className="fs-4" />
const reactRupeesIcon =  <FaIndianRupeeSign className="me-1" />

const dashboardIcon = <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
    <path d="M3 6.5C3 5.43913 3.42143 4.42172 4.17157 3.67157C4.92172 2.92143 5.93913 2.5 7 2.5C8.06087 2.5 9.07828 2.92143 9.82843 3.67157C10.5786 4.42172 11 5.43913 11 6.5C11 7.56087 10.5786 8.57828 9.82843 9.32843C9.07828 10.0786 8.06087 10.5 7 10.5C5.93913 10.5 4.92172 10.0786 4.17157 9.32843C3.42143 8.57828 3 7.56087 3 6.5ZM14 17.5C14 16.4391 14.4214 15.4217 15.1716 14.6716C15.9217 13.9214 16.9391 13.5 18 13.5C19.0609 13.5 20.0783 13.9214 20.8284 14.6716C21.5786 15.4217 22 16.4391 22 17.5C22 18.5609 21.5786 19.5783 20.8284 20.3284C20.0783 21.0786 19.0609 21.5 18 21.5C16.9391 21.5 15.9217 21.0786 15.1716 20.3284C14.4214 19.5783 14 18.5609 14 17.5ZM22 6.5C22 4.614 22 3.672 21.414 3.086C20.828 2.5 19.886 2.5 18 2.5C16.114 2.5 15.172 2.5 14.586 3.086C14 3.672 14 4.614 14 6.5C14 8.386 14 9.328 14.586 9.914C15.172 10.5 16.114 10.5 18 10.5C19.886 10.5 20.828 10.5 21.414 9.914C22 9.328 22 8.386 22 6.5ZM11 17.5C11 15.614 11 14.672 10.414 14.086C9.828 13.5 8.886 13.5 7 13.5C5.114 13.5 4.172 13.5 3.586 14.086C3 14.672 3 15.614 3 17.5C3 19.386 3 20.328 3.586 20.914C4.172 21.5 5.114 21.5 7 21.5C8.886 21.5 9.828 21.5 10.414 20.914C11 20.328 11 19.386 11 17.5Z" stroke="white" stroke-width="1.5" />
</svg>

const analyticsIcon = <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
    <path d="M7.5 18V16M12.5 18V15M17.5 18V13M3 12C3 7.522 3 5.282 4.391 3.891C5.782 2.5 8.021 2.5 12.5 2.5C16.978 2.5 19.218 2.5 20.609 3.891C22 5.282 22 7.521 22 12C22 16.478 22 18.718 20.609 20.109C19.218 21.5 16.979 21.5 12.5 21.5C8.022 21.5 5.782 21.5 4.391 20.109C3 18.718 3 16.479 3 12Z" stroke="#989898" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M6.49194 11.486C8.64694 11.558 13.5339 11.233 16.3139 6.82097M14.4919 6.28797L16.3679 5.98597C16.5959 5.95697 16.9319 6.13797 17.0149 6.35297L17.5099 7.99097" stroke="#989898" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>

const servicesIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12.3701 8.88H17.6201" stroke="#A3A3A3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M6.37988 8.88L7.12988 9.63L9.37988 7.38" stroke="#A3A3A3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M12.3701 15.88H17.6201" stroke="#A3A3A3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M6.37988 15.88L7.12988 16.63L9.37988 14.38" stroke="#A3A3A3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#A3A3A3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>

const subServivesIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.84239 1.58374C7.5634 1.58374 7.31551 1.63252 7.15727 1.70338L7.15568 1.70408L2.72944 3.66963C2.14845 3.92595 2.10864 4.15785 2.10864 4.18249C2.10864 4.20712 2.14845 4.43903 2.72944 4.69535L2.73068 4.6959L7.15727 6.6616C7.31551 6.73246 7.5634 6.78124 7.84239 6.78124C8.12138 6.78124 8.36928 6.73246 8.52752 6.6616L8.5291 6.6609L12.9541 4.6959L12.9553 4.69535C13.5363 4.43903 13.5761 4.20712 13.5761 4.18249C13.5761 4.15785 13.5363 3.92595 12.9553 3.66963L8.5291 1.70408L8.52752 1.70338C8.36928 1.63252 8.12138 1.58374 7.84239 1.58374ZM8.98643 0.676229C8.64233 0.522356 8.22684 0.45874 7.84239 0.45874C7.45795 0.45874 7.04245 0.522356 6.69836 0.676229C6.69808 0.676355 6.6978 0.67648 6.69752 0.676605L2.27534 2.64035C2.27515 2.64044 2.27554 2.64026 2.27534 2.64035C1.58159 2.94656 0.983643 3.46108 0.983643 4.18249C0.983643 4.90387 1.58095 5.41812 2.27468 5.72434C2.27445 5.72424 2.2749 5.72443 2.27468 5.72434L6.69752 7.68837C6.69784 7.68852 6.69816 7.68866 6.69847 7.6888C7.04255 7.84264 7.45799 7.90624 7.84239 7.90624C8.22681 7.90624 8.64228 7.84263 8.98636 7.68878C8.98666 7.68864 8.98697 7.68851 8.98727 7.68837L13.4094 5.72463C13.4092 5.72472 13.4096 5.72454 13.4094 5.72463C14.1032 5.41842 14.7011 4.9039 14.7011 4.18249C14.7011 3.46106 14.1037 2.94679 13.41 2.64058C13.4098 2.6405 13.4101 2.64066 13.41 2.64058L8.98727 0.676605C8.98699 0.67648 8.98671 0.676355 8.98643 0.676229Z" fill="#A3A3A3" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.25 6.6875C1.56066 6.6875 1.8125 6.93934 1.8125 7.25C1.8125 7.43254 1.88471 7.66692 2.02992 7.89011C2.17513 8.11328 2.36005 8.27412 2.52721 8.34793L2.52859 8.34854L7.62003 10.6131C7.61985 10.613 7.62022 10.6132 7.62003 10.6131C7.86641 10.7219 8.14237 10.7202 8.37625 10.6147L8.3789 10.6135L13.4714 8.34854L13.4728 8.34793C13.6399 8.27412 13.8249 8.11328 13.9701 7.89011C14.1153 7.66692 14.1875 7.43254 14.1875 7.25C14.1875 6.93934 14.4393 6.6875 14.75 6.6875C15.0607 6.6875 15.3125 6.93934 15.3125 7.25C15.3125 7.69746 15.1485 8.14183 14.913 8.50364C14.6778 8.86528 14.3379 9.19554 13.9278 9.37679C13.9276 9.37688 13.9281 9.37669 13.9278 9.37679L8.83875 11.6403C8.83825 11.6405 8.83775 11.6407 8.83725 11.6409C8.30667 11.8797 7.69795 11.8777 7.16496 11.6419L2.07279 9.37707C2.07253 9.37695 2.07228 9.37684 2.07202 9.37673C1.66202 9.19547 1.32222 8.86524 1.08695 8.50364C0.851538 8.14183 0.6875 7.69746 0.6875 7.25C0.6875 6.93934 0.93934 6.6875 1.25 6.6875Z" fill="#A3A3A3" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.25 10.4375C1.56066 10.4375 1.8125 10.6893 1.8125 11C1.8125 11.4731 2.09221 11.9033 2.52915 12.0988C2.52901 12.0987 2.52929 12.0989 2.52915 12.0988L7.62003 14.3631C7.61985 14.363 7.62022 14.3632 7.62003 14.3631C7.86641 14.4719 8.14237 14.4702 8.37625 14.3647L8.3789 14.3635L13.4704 12.099C13.4703 12.0991 13.4706 12.0989 13.4704 12.099C13.9073 11.9034 14.1875 11.4731 14.1875 11C14.1875 10.6893 14.4393 10.4375 14.75 10.4375C15.0607 10.4375 15.3125 10.6893 15.3125 11C15.3125 11.9218 14.7674 12.7515 13.9296 13.126L13.9286 13.1265L8.83875 15.3903C8.83825 15.3905 8.83775 15.3907 8.83725 15.3909C8.30667 15.6297 7.69795 15.6277 7.16496 15.3919L2.07043 13.126C1.23261 12.7515 0.6875 11.9218 0.6875 11C0.6875 10.6893 0.93934 10.4375 1.25 10.4375Z" fill="#A3A3A3" />
</svg>

const blogIcon = <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
    <path d="M12.5 22C18.0228 22 22.5 17.5228 22.5 12C22.5 6.47715 18.0228 2 12.5 2C6.97715 2 2.5 6.47715 2.5 12C2.5 17.5228 6.97715 22 12.5 22Z" stroke="#A3A3A3" stroke-width="1.5" />
    <path d="M12.5 17V18M12.5 17C14.157 17 15.5 15.88 15.5 14.5C15.5 13.12 14.157 12 12.5 12C10.843 12 9.5 10.88 9.5 9.5C9.5 8.12 10.843 7 12.5 7M12.5 17C10.843 17 9.5 15.88 9.5 14.5M12.5 6V7M12.5 7C14.157 7 15.5 8.12 15.5 9.5" stroke="#A3A3A3" stroke-width="1.5" stroke-linecap="round" />
</svg>

const feedbackIcon = <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
    <path d="M3.5 12C3.5 15.771 3.5 19.657 4.818 20.828C6.136 22 8.258 22 12.5 22C16.743 22 18.864 22 20.182 20.828C21.5 19.657 21.5 15.771 21.5 12" stroke="#A3A3A3" stroke-width="1.5" />
    <path d="M15.16 14.202L21.358 12.342C21.768 12.219 21.974 12.158 22.126 12.036C22.2588 11.9291 22.3621 11.79 22.426 11.632C22.5 11.452 22.5 11.237 22.5 10.808C22.5 9.12 22.5 8.277 22.17 7.633C21.8831 7.07273 21.4273 6.61688 20.867 6.33C20.223 6 19.38 6 17.692 6H7.308C5.62 6 4.777 6 4.133 6.33C3.57273 6.61688 3.11688 7.07273 2.83 7.633C2.5 8.277 2.5 9.12 2.5 10.808C2.5 11.237 2.5 11.451 2.573 11.632C2.63693 11.79 2.7402 11.9291 2.873 12.036C3.026 12.158 3.231 12.219 3.643 12.343L9.84 14.202" stroke="#A3A3A3" stroke-width="1.5" />
    <path d="M9.66992 4.00001C9.87652 3.41448 10.2597 2.90744 10.7665 2.5488C11.2734 2.19015 11.879 1.99756 12.4999 1.99756C13.1208 1.99756 13.7265 2.19015 14.2333 2.5488C14.7402 2.90744 15.1233 3.41448 15.3299 4.00001M14.4999 12.5H10.4999C10.3673 12.5 10.2401 12.5527 10.1464 12.6465C10.0526 12.7402 9.99992 12.8674 9.99992 13V15.162C9.99995 15.2619 10.0299 15.3594 10.0858 15.4421C10.1418 15.5248 10.2212 15.5889 10.3139 15.626L11.0139 15.906C11.9678 16.2877 13.032 16.2877 13.9859 15.906L14.6859 15.626C14.7786 15.5889 14.8581 15.5248 14.914 15.4421C14.97 15.3594 14.9999 15.2619 14.9999 15.162V13C14.9999 12.8674 14.9472 12.7402 14.8535 12.6465C14.7597 12.5527 14.6325 12.5 14.4999 12.5Z" stroke="#A3A3A3" stroke-width="1.5" stroke-linecap="round" />
</svg>

const crmIcon = <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
    <path d="M2.5 12C2.5 8.229 2.5 6.343 3.672 5.172C4.843 4 6.729 4 10.5 4H14.5C18.271 4 20.157 4 21.328 5.172C22.5 6.343 22.5 8.229 22.5 12V14C22.5 17.771 22.5 19.657 21.328 20.828C20.157 22 18.271 22 14.5 22H10.5C6.729 22 4.843 22 3.672 20.828C2.5 19.657 2.5 17.771 2.5 14V12Z" stroke="#A3A3A3" stroke-width="1.5" />
    <path d="M7.5 4V2.5M17.5 4V2.5M3 9H22" stroke="#A3A3A3" stroke-width="1.5" stroke-linecap="round" />
    <path d="M18.5 17C18.5 17.2652 18.3946 17.5196 18.2071 17.7071C18.0196 17.8946 17.7652 18 17.5 18C17.2348 18 16.9804 17.8946 16.7929 17.7071C16.6054 17.5196 16.5 17.2652 16.5 17C16.5 16.7348 16.6054 16.4804 16.7929 16.2929C16.9804 16.1054 17.2348 16 17.5 16C17.7652 16 18.0196 16.1054 18.2071 16.2929C18.3946 16.4804 18.5 16.7348 18.5 17ZM18.5 13C18.5 13.2652 18.3946 13.5196 18.2071 13.7071C18.0196 13.8946 17.7652 14 17.5 14C17.2348 14 16.9804 13.8946 16.7929 13.7071C16.6054 13.5196 16.5 13.2652 16.5 13C16.5 12.7348 16.6054 12.4804 16.7929 12.2929C16.9804 12.1054 17.2348 12 17.5 12C17.7652 12 18.0196 12.1054 18.2071 12.2929C18.3946 12.4804 18.5 12.7348 18.5 13ZM13.5 17C13.5 17.2652 13.3946 17.5196 13.2071 17.7071C13.0196 17.8946 12.7652 18 12.5 18C12.2348 18 11.9804 17.8946 11.7929 17.7071C11.6054 17.5196 11.5 17.2652 11.5 17C11.5 16.7348 11.6054 16.4804 11.7929 16.2929C11.9804 16.1054 12.2348 16 12.5 16C12.7652 16 13.0196 16.1054 13.2071 16.2929C13.3946 16.4804 13.5 16.7348 13.5 17ZM13.5 13C13.5 13.2652 13.3946 13.5196 13.2071 13.7071C13.0196 13.8946 12.7652 14 12.5 14C12.2348 14 11.9804 13.8946 11.7929 13.7071C11.6054 13.5196 11.5 13.2652 11.5 13C11.5 12.7348 11.6054 12.4804 11.7929 12.2929C11.9804 12.1054 12.2348 12 12.5 12C12.7652 12 13.0196 12.1054 13.2071 12.2929C13.3946 12.4804 13.5 12.7348 13.5 13ZM8.5 17C8.5 17.2652 8.39464 17.5196 8.20711 17.7071C8.01957 17.8946 7.76522 18 7.5 18C7.23478 18 6.98043 17.8946 6.79289 17.7071C6.60536 17.5196 6.5 17.2652 6.5 17C6.5 16.7348 6.60536 16.4804 6.79289 16.2929C6.98043 16.1054 7.23478 16 7.5 16C7.76522 16 8.01957 16.1054 8.20711 16.2929C8.39464 16.4804 8.5 16.7348 8.5 17ZM8.5 13C8.5 13.2652 8.39464 13.5196 8.20711 13.7071C8.01957 13.8946 7.76522 14 7.5 14C7.23478 14 6.98043 13.8946 6.79289 13.7071C6.60536 13.5196 6.5 13.2652 6.5 13C6.5 12.7348 6.60536 12.4804 6.79289 12.2929C6.98043 12.1054 7.23478 12 7.5 12C7.76522 12 8.01957 12.1054 8.20711 12.2929C8.39464 12.4804 8.5 12.7348 8.5 13Z" fill="#A3A3A3" />
</svg>

const starGray = <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
    <path d="M5.15167 4.28162L1.16417 4.82121L1.09354 4.83462C0.98663 4.86111 0.889165 4.91361 0.8111 4.98676C0.733036 5.0599 0.67717 5.15107 0.649207 5.25096C0.621243 5.35085 0.622185 5.45588 0.651935 5.55531C0.681685 5.65475 0.739178 5.74504 0.818543 5.81695L3.70729 8.44137L3.02604 12.1485L3.01792 12.2126C3.01137 12.3158 3.03433 12.4188 3.08445 12.511C3.13456 12.6032 3.21003 12.6813 3.30313 12.7373C3.39622 12.7934 3.5036 12.8253 3.61426 12.8299C3.72492 12.8344 3.8349 12.8114 3.93292 12.7633L7.49917 11.0133L11.0573 12.7633L11.1198 12.7901C11.223 12.828 11.3351 12.8397 11.4446 12.8238C11.5542 12.808 11.6573 12.7652 11.7433 12.6999C11.8293 12.6345 11.8951 12.5491 11.9341 12.4522C11.973 12.3553 11.9836 12.2504 11.9648 12.1485L11.2829 8.44137L14.1729 5.81637L14.2217 5.76679C14.2913 5.68674 14.337 5.59089 14.354 5.489C14.371 5.38712 14.3588 5.28284 14.3186 5.1868C14.2784 5.09075 14.2116 5.00637 14.1251 4.94225C14.0386 4.87813 13.9354 4.83657 13.826 4.82179L9.83854 4.28162L8.05604 0.909955C8.00447 0.812267 7.92462 0.730005 7.82554 0.672482C7.72646 0.61496 7.6121 0.584473 7.49542 0.584473C7.37873 0.584473 7.26438 0.61496 7.1653 0.672482C7.06622 0.730005 6.98637 0.812267 6.93479 0.909955L5.15167 4.28162Z" fill="gray" />
</svg>

const startBlack = <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
    <path d="M5.15167 4.28162L1.16417 4.82121L1.09354 4.83462C0.98663 4.86111 0.889165 4.91361 0.8111 4.98676C0.733036 5.0599 0.67717 5.15107 0.649207 5.25096C0.621243 5.35085 0.622185 5.45588 0.651935 5.55531C0.681685 5.65475 0.739178 5.74504 0.818543 5.81695L3.70729 8.44137L3.02604 12.1485L3.01792 12.2126C3.01137 12.3158 3.03433 12.4188 3.08445 12.511C3.13456 12.6032 3.21003 12.6813 3.30313 12.7373C3.39622 12.7934 3.5036 12.8253 3.61426 12.8299C3.72492 12.8344 3.8349 12.8114 3.93292 12.7633L7.49917 11.0133L11.0573 12.7633L11.1198 12.7901C11.223 12.828 11.3351 12.8397 11.4446 12.8238C11.5542 12.808 11.6573 12.7652 11.7433 12.6999C11.8293 12.6345 11.8951 12.5491 11.9341 12.4522C11.973 12.3553 11.9836 12.2504 11.9648 12.1485L11.2829 8.44137L14.1729 5.81637L14.2217 5.76679C14.2913 5.68674 14.337 5.59089 14.354 5.489C14.371 5.38712 14.3588 5.28284 14.3186 5.1868C14.2784 5.09075 14.2116 5.00637 14.1251 4.94225C14.0386 4.87813 13.9354 4.83657 13.826 4.82179L9.83854 4.28162L8.05604 0.909955C8.00447 0.812267 7.92462 0.730005 7.82554 0.672482C7.72646 0.61496 7.6121 0.584473 7.49542 0.584473C7.37873 0.584473 7.26438 0.61496 7.1653 0.672482C7.06622 0.730005 6.98637 0.812267 6.93479 0.909955L5.15167 4.28162Z" fill="black" />
</svg>

const blueCardCompanyIcon = <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M13.5 11.25H12V12.75H13.5M13.5 8.25H12V9.75H13.5M15 14.25H9V12.75H10.5V11.25H9V9.75H10.5V8.25H9V6.75H15M7.5 5.25H6V3.75H7.5M7.5 8.25H6V6.75H7.5M7.5 11.25H6V9.75H7.5M7.5 14.25H6V12.75H7.5M4.5 5.25H3V3.75H4.5M4.5 8.25H3V6.75H4.5M4.5 11.25H3V9.75H4.5M4.5 14.25H3V12.75H4.5M9 5.25V2.25H1.5V15.75H16.5V5.25H9Z" fill="#292929" />
</svg>

const greenLocationIcon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M9.99984 9.58329C9.4473 9.58329 8.9174 9.3638 8.5267 8.9731C8.136 8.5824 7.9165 8.05249 7.9165 7.49996C7.9165 6.94742 8.136 6.41752 8.5267 6.02682C8.9174 5.63612 9.4473 5.41663 9.99984 5.41663C10.5524 5.41663 11.0823 5.63612 11.473 6.02682C11.8637 6.41752 12.0832 6.94742 12.0832 7.49996C12.0832 7.77355 12.0293 8.04446 11.9246 8.29722C11.8199 8.54998 11.6664 8.77964 11.473 8.9731C11.2795 9.16655 11.0499 9.32001 10.7971 9.42471C10.5443 9.52941 10.2734 9.58329 9.99984 9.58329ZM9.99984 1.66663C8.45274 1.66663 6.96901 2.28121 5.87505 3.37517C4.78109 4.46913 4.1665 5.95286 4.1665 7.49996C4.1665 11.875 9.99984 18.3333 9.99984 18.3333C9.99984 18.3333 15.8332 11.875 15.8332 7.49996C15.8332 5.95286 15.2186 4.46913 14.1246 3.37517C13.0307 2.28121 11.5469 1.66663 9.99984 1.66663Z" fill="#00BC29" />
</svg>

const redLocationIcon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M9.99984 9.58329C9.4473 9.58329 8.9174 9.3638 8.5267 8.9731C8.136 8.5824 7.9165 8.05249 7.9165 7.49996C7.9165 6.94742 8.136 6.41752 8.5267 6.02682C8.9174 5.63612 9.4473 5.41663 9.99984 5.41663C10.5524 5.41663 11.0823 5.63612 11.473 6.02682C11.8637 6.41752 12.0832 6.94742 12.0832 7.49996C12.0832 7.77355 12.0293 8.04446 11.9246 8.29722C11.8199 8.54998 11.6664 8.77964 11.473 8.9731C11.2795 9.16655 11.0499 9.32001 10.7971 9.42471C10.5443 9.52941 10.2734 9.58329 9.99984 9.58329ZM9.99984 1.66663C8.45274 1.66663 6.96901 2.28121 5.87505 3.37517C4.78109 4.46913 4.1665 5.95286 4.1665 7.49996C4.1665 11.875 9.99984 18.3333 9.99984 18.3333C9.99984 18.3333 15.8332 11.875 15.8332 7.49996C15.8332 5.95286 15.2186 4.46913 14.1246 3.37517C13.0307 2.28121 11.5469 1.66663 9.99984 1.66663Z" fill="#F00000" />
</svg>

const materialIcon = <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M8.99988 5.25C9.21238 5.25 9.39063 5.178 9.53463 5.034C9.67863 4.89 9.75038 4.712 9.74988 4.5C9.74938 4.288 9.67738 4.11 9.53388 3.966C9.39038 3.822 9.21238 3.75 8.99988 3.75C8.78738 3.75 8.60938 3.822 8.46588 3.966C8.32238 4.11 8.25038 4.288 8.24988 4.5C8.24938 4.712 8.32138 4.89025 8.46588 5.03475C8.61038 5.17925 8.78838 5.251 8.99988 5.25ZM11.1186 5.25H12.4311C12.8061 5.25 13.1311 5.375 13.4061 5.625C13.6811 5.875 13.8499 6.18125 13.9124 6.54375L14.9811 14.0438C15.0436 14.4938 14.9281 14.8907 14.6346 15.2347C14.3411 15.5787 13.9629 15.7505 13.4999 15.75H4.49988C4.03738 15.75 3.65913 15.5782 3.36513 15.2347C3.07113 14.8912 2.95563 14.4943 3.01863 14.0438L4.08738 6.54375C4.14988 6.18125 4.31863 5.875 4.59363 5.625C4.86863 5.375 5.19363 5.25 5.56863 5.25H6.88113C6.84363 5.125 6.81238 5.00325 6.78738 4.88475C6.76238 4.76625 6.74988 4.638 6.74988 4.5C6.74988 3.875 6.96863 3.34375 7.40613 2.90625C7.84363 2.46875 8.37488 2.25 8.99988 2.25C9.62488 2.25 10.1561 2.46875 10.5936 2.90625C11.0311 3.34375 11.2499 3.875 11.2499 4.5C11.2499 4.6375 11.2374 4.76575 11.2124 4.88475C11.1874 5.00375 11.1561 5.1255 11.1186 5.25Z" fill="#646464" />
</svg>

const numberPlateIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 4.66667L6.66667 2L14 4.66667M2 4.66667V8L9.33333 10.6667L14 8V4.66667M2 4.66667L9.33333 7.33333L14 4.66667" stroke="#646464" stroke-width="2" stroke-linejoin="round" />
    <path d="M2 8V11.3333L9.33333 14L14 11.3333V8" stroke="#646464" stroke-width="2" stroke-linejoin="round" />
</svg>

const wheelIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00016 14.6667C11.6822 14.6667 14.6668 11.682 14.6668 8.00004C14.6668 4.31804 11.6822 1.33337 8.00016 1.33337C4.31816 1.33337 1.3335 4.31804 1.3335 8.00004C1.3335 11.682 4.31816 14.6667 8.00016 14.6667ZM11.9695 8.50004H9.93683C9.84597 8.85186 9.66088 9.17224 9.4015 9.42671L10.4175 11.1867C10.8422 10.865 11.1983 10.4615 11.4649 10.0001C11.7314 9.53874 11.903 9.02871 11.9695 8.50004ZM9.55216 11.688L8.5355 9.92804C8.18522 10.0252 7.81511 10.0252 7.46483 9.92804L6.44816 11.688C6.93944 11.8947 7.46717 12.0008 8.00016 12C8.55016 12 9.07483 11.8887 9.55216 11.688ZM5.58283 11.1874L6.59883 9.42737C6.33909 9.17281 6.15377 8.85217 6.06283 8.50004H4.03083C4.09733 9.02872 4.26889 9.53876 4.53542 10.0002C4.80196 10.4615 5.15808 10.8656 5.58283 11.1874ZM11.9695 7.49937H9.93683C9.84597 7.14755 9.66088 6.82717 9.4015 6.57271L10.4175 4.81271C10.8422 5.13446 11.1983 5.5379 11.4649 5.99929C11.7314 6.46068 11.903 6.9707 11.9695 7.49937ZM9.55216 4.31137C9.06083 4.10494 8.5331 3.99907 8.00016 4.00004C7.45016 4.00004 6.9255 4.11137 6.44816 4.31204L7.46483 6.07204C7.81509 5.9748 8.18523 5.9748 8.5355 6.07204L9.55216 4.31137ZM6.59883 6.57337L5.58283 4.81337C5.1581 5.13513 4.802 5.53856 4.53547 5.99995C4.26894 6.46134 4.09737 6.97137 4.03083 7.50004H6.0635C6.1555 7.14337 6.3435 6.82471 6.59883 6.57337Z" fill="#646464" />
</svg>

const containerIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <g clip-path="url(#clip0_24_18560)">
        <path d="M10.0002 2.66663C10.3538 2.66663 10.6929 2.8071 10.943 3.05715C11.193 3.3072 11.3335 3.64634 11.3335 3.99996V4.66663H12.3468C12.5467 4.66665 12.744 4.7116 12.9241 4.79815C13.1042 4.88469 13.2626 5.01062 13.3875 5.16663L14.3742 6.40063C14.5636 6.63709 14.6668 6.931 14.6668 7.23396V9.99996C14.6668 10.3536 14.5264 10.6927 14.2763 10.9428C14.0263 11.1928 13.6871 11.3333 13.3335 11.3333H12.6668C12.6668 11.8637 12.4561 12.3724 12.081 12.7475C11.706 13.1226 11.1973 13.3333 10.6668 13.3333C10.1364 13.3333 9.62769 13.1226 9.25261 12.7475C8.87754 12.3724 8.66683 11.8637 8.66683 11.3333H6.66683C6.66683 11.5959 6.6151 11.856 6.51459 12.0987C6.41408 12.3413 6.26676 12.5618 6.08104 12.7475C5.89533 12.9332 5.67485 13.0805 5.4322 13.1811C5.18954 13.2816 4.92947 13.3333 4.66683 13.3333C4.40419 13.3333 4.14411 13.2816 3.90146 13.1811C3.65881 13.0805 3.43833 12.9332 3.25262 12.7475C3.0669 12.5618 2.91958 12.3413 2.81907 12.0987C2.71856 11.856 2.66683 11.5959 2.66683 11.3333C2.31321 11.3333 1.97407 11.1928 1.72402 10.9428C1.47397 10.6927 1.3335 10.3536 1.3335 9.99996V3.99996C1.3335 3.64634 1.47397 3.3072 1.72402 3.05715C1.97407 2.8071 2.31321 2.66663 2.66683 2.66663H10.0002ZM4.66683 10.6666C4.49002 10.6666 4.32045 10.7369 4.19542 10.8619C4.0704 10.9869 4.00016 11.1565 4.00016 11.3333C4.00016 11.5101 4.0704 11.6797 4.19542 11.8047C4.32045 11.9297 4.49002 12 4.66683 12C4.84364 12 5.01321 11.9297 5.13823 11.8047C5.26326 11.6797 5.3335 11.5101 5.3335 11.3333C5.3335 11.1565 5.26326 10.9869 5.13823 10.8619C5.01321 10.7369 4.84364 10.6666 4.66683 10.6666ZM10.6668 10.6666C10.49 10.6666 10.3204 10.7369 10.1954 10.8619C10.0704 10.9869 10.0002 11.1565 10.0002 11.3333C10.0002 11.5101 10.0704 11.6797 10.1954 11.8047C10.3204 11.9297 10.49 12 10.6668 12C10.8436 12 11.0132 11.9297 11.1382 11.8047C11.2633 11.6797 11.3335 11.5101 11.3335 11.3333C11.3335 11.1565 11.2633 10.9869 11.1382 10.8619C11.0132 10.7369 10.8436 10.6666 10.6668 10.6666ZM12.3468 5.99996H11.3335V8.66663H13.3335V7.23329L12.3468 5.99996Z" fill="#646464" />
    </g>
    <defs>
        <clipPath id="clip0_24_18560">
            <rect width="16" height="16" fill="white" />
        </clipPath>
    </defs>
</svg>

const companyIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <g clip-path="url(#clip0_24_18560)">
        <path d="M10.0002 2.66663C10.3538 2.66663 10.6929 2.8071 10.943 3.05715C11.193 3.3072 11.3335 3.64634 11.3335 3.99996V4.66663H12.3468C12.5467 4.66665 12.744 4.7116 12.9241 4.79815C13.1042 4.88469 13.2626 5.01062 13.3875 5.16663L14.3742 6.40063C14.5636 6.63709 14.6668 6.931 14.6668 7.23396V9.99996C14.6668 10.3536 14.5264 10.6927 14.2763 10.9428C14.0263 11.1928 13.6871 11.3333 13.3335 11.3333H12.6668C12.6668 11.8637 12.4561 12.3724 12.081 12.7475C11.706 13.1226 11.1973 13.3333 10.6668 13.3333C10.1364 13.3333 9.62769 13.1226 9.25261 12.7475C8.87754 12.3724 8.66683 11.8637 8.66683 11.3333H6.66683C6.66683 11.5959 6.6151 11.856 6.51459 12.0987C6.41408 12.3413 6.26676 12.5618 6.08104 12.7475C5.89533 12.9332 5.67485 13.0805 5.4322 13.1811C5.18954 13.2816 4.92947 13.3333 4.66683 13.3333C4.40419 13.3333 4.14411 13.2816 3.90146 13.1811C3.65881 13.0805 3.43833 12.9332 3.25262 12.7475C3.0669 12.5618 2.91958 12.3413 2.81907 12.0987C2.71856 11.856 2.66683 11.5959 2.66683 11.3333C2.31321 11.3333 1.97407 11.1928 1.72402 10.9428C1.47397 10.6927 1.3335 10.3536 1.3335 9.99996V3.99996C1.3335 3.64634 1.47397 3.3072 1.72402 3.05715C1.97407 2.8071 2.31321 2.66663 2.66683 2.66663H10.0002ZM4.66683 10.6666C4.49002 10.6666 4.32045 10.7369 4.19542 10.8619C4.0704 10.9869 4.00016 11.1565 4.00016 11.3333C4.00016 11.5101 4.0704 11.6797 4.19542 11.8047C4.32045 11.9297 4.49002 12 4.66683 12C4.84364 12 5.01321 11.9297 5.13823 11.8047C5.26326 11.6797 5.3335 11.5101 5.3335 11.3333C5.3335 11.1565 5.26326 10.9869 5.13823 10.8619C5.01321 10.7369 4.84364 10.6666 4.66683 10.6666ZM10.6668 10.6666C10.49 10.6666 10.3204 10.7369 10.1954 10.8619C10.0704 10.9869 10.0002 11.1565 10.0002 11.3333C10.0002 11.5101 10.0704 11.6797 10.1954 11.8047C10.3204 11.9297 10.49 12 10.6668 12C10.8436 12 11.0132 11.9297 11.1382 11.8047C11.2633 11.6797 11.3335 11.5101 11.3335 11.3333C11.3335 11.1565 11.2633 10.9869 11.1382 10.8619C11.0132 10.7369 10.8436 10.6666 10.6668 10.6666ZM12.3468 5.99996H11.3335V8.66663H13.3335V7.23329L12.3468 5.99996Z" fill="#646464" />
    </g>
    <defs>
        <clipPath id="clip0_24_18560">
            <rect width="16" height="16" fill="white" />
        </clipPath>
    </defs>
</svg>

const truckNumberPlateIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M16 8.5C16 8.45 16 8.4 15.95 8.35C15.95 8.35 15.95 8.35 15.95 8.3L14.45 5.3C14.35 5.1 14.2 5 14 5H10.5C10.2 5 10 5.2 10 5.5V8H9V6.5V4.5C9 4.2 8.8 4 8.5 4H6H3.5H1C0.7 4 0.5 4.2 0.5 4.5V6.5V8C0.2 8 0 8.2 0 8.5V11.5C0 11.8 0.2 12 0.5 12H1.5C1.5 13.1 2.4 14 3.5 14C4.6 14 5.5 13.1 5.5 12H10.5H11C11 13.1 11.9 14 13 14C14.1 14 15 13.1 15 12H15.5C15.8 12 16 11.8 16 11.5V8.5ZM11 6H13.7L14.7 8H11V6ZM4 8V7H5.5V8H4ZM6.5 7H8V8H6.5V7ZM8 6H6.5V5H8V6ZM5.5 6H4V5H5.5V6ZM1.5 5H3V6H1.5V5ZM1.5 7H3V8H1.5V7ZM3.5 13C2.95 13 2.5 12.55 2.5 12C2.5 11.45 2.95 11 3.5 11C4.05 11 4.5 11.45 4.5 12C4.5 12.55 4.05 13 3.5 13ZM13 13C12.45 13 12 12.55 12 12C12 11.45 12.45 11 13 11C13.55 11 14 11.45 14 12C14 12.55 13.55 13 13 13Z" fill="#646464" />
</svg>

const ownerIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M13.5799 14.1663C13.5799 14.2989 13.5272 14.4261 13.4335 14.5199C13.3397 14.6137 13.2125 14.6663 13.0799 14.6663H2.91992C2.78731 14.6663 2.66014 14.6137 2.56637 14.5199C2.4726 14.4261 2.41992 14.2989 2.41992 14.1663C2.41992 11.433 5.41992 9.31301 7.99992 9.31301C10.5799 9.31301 13.5799 11.433 13.5799 14.1663ZM11.3999 4.73967C11.3986 5.41185 11.1981 6.06854 10.8237 6.62679C10.4493 7.18504 9.91782 7.61979 9.29643 7.87611C8.67505 8.13242 7.99163 8.1988 7.33254 8.06686C6.67344 7.93492 6.06824 7.61058 5.59341 7.13481C5.11858 6.65905 4.79542 6.05322 4.66477 5.39387C4.53412 4.73451 4.60184 4.05123 4.85937 3.43035C5.11691 2.80947 5.5527 2.27885 6.11168 1.90555C6.67066 1.53225 7.32775 1.33301 7.99992 1.33301C8.90227 1.33477 9.76706 1.69447 10.4045 2.33315C11.0419 2.97183 11.3999 3.83732 11.3999 4.73967Z" fill="#646464" />
</svg>

const buySellTruckIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M16 8.5C16 8.45 16 8.4 15.95 8.35C15.95 8.35 15.95 8.35 15.95 8.3L14.45 5.3C14.35 5.1 14.2 5 14 5H10.5C10.2 5 10 5.2 10 5.5V8H9V6.5V4.5C9 4.2 8.8 4 8.5 4H6H3.5H1C0.7 4 0.5 4.2 0.5 4.5V6.5V8C0.2 8 0 8.2 0 8.5V11.5C0 11.8 0.2 12 0.5 12H1.5C1.5 13.1 2.4 14 3.5 14C4.6 14 5.5 13.1 5.5 12H10.5H11C11 13.1 11.9 14 13 14C14.1 14 15 13.1 15 12H15.5C15.8 12 16 11.8 16 11.5V8.5ZM11 6H13.7L14.7 8H11V6ZM4 8V7H5.5V8H4ZM6.5 7H8V8H6.5V7ZM8 6H6.5V5H8V6ZM5.5 6H4V5H5.5V6ZM1.5 5H3V6H1.5V5ZM1.5 7H3V8H1.5V7ZM3.5 13C2.95 13 2.5 12.55 2.5 12C2.5 11.45 2.95 11 3.5 11C4.05 11 4.5 11.45 4.5 12C4.5 12.55 4.05 13 3.5 13ZM13 13C12.45 13 12 12.55 12 12C12 11.45 12.45 11 13 11C13.55 11 14 11.45 14 12C14 12.55 13.55 13 13 13Z" fill="#646464" />
</svg>

const kmsDrivernIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M7.59301 6.92675L4.99968 9.51809L2.40634 6.92675C1.89372 6.41389 1.54468 5.76055 1.40334 5.04933C1.262 4.33812 1.33471 3.60096 1.61228 2.93107C1.88985 2.26117 2.35982 1.68862 2.96276 1.28579C3.56571 0.882972 4.27455 0.667969 4.99968 0.667969C5.7248 0.667969 6.43364 0.882972 7.03659 1.28579C7.63953 1.68862 8.1095 2.26117 8.38707 2.93107C8.66464 3.60096 8.73735 4.33812 8.59601 5.04933C8.45467 5.76055 8.10563 6.41389 7.59301 6.92675ZM4.99968 5.66675C5.3533 5.66675 5.69244 5.52628 5.94248 5.27623C6.19253 5.02618 6.33301 4.68704 6.33301 4.33342C6.33301 3.9798 6.19253 3.64066 5.94248 3.39061C5.69244 3.14056 5.3533 3.00009 4.99968 3.00009C4.64605 3.00009 4.30692 3.14056 4.05687 3.39061C3.80682 3.64066 3.66634 3.9798 3.66634 4.33342C3.66634 4.68704 3.80682 5.02618 4.05687 5.27623C4.30692 5.52628 4.64605 5.66675 4.99968 5.66675ZM13.593 12.9268L10.9997 15.5188L8.40634 12.9261C7.89372 12.4132 7.54468 11.7599 7.40334 11.0487C7.262 10.3375 7.33471 9.6003 7.61228 8.9304C7.88985 8.2605 8.35982 7.68795 8.96276 7.28513C9.56571 6.88231 10.2746 6.6673 10.9997 6.6673C11.7248 6.6673 12.4336 6.88231 13.0366 7.28513C13.6395 7.68795 14.1095 8.2605 14.3871 8.9304C14.6646 9.6003 14.7374 10.3375 14.596 11.0487C14.4547 11.7599 14.1056 12.4139 13.593 12.9268ZM10.9997 11.6668C11.3533 11.6668 11.6924 11.5263 11.9425 11.2762C12.1925 11.0262 12.333 10.687 12.333 10.3334C12.333 9.9798 12.1925 9.64066 11.9425 9.39061C11.6924 9.14056 11.3533 9.00009 10.9997 9.00009C10.6461 9.00009 10.3069 9.14056 10.0569 9.39061C9.80682 9.64066 9.66634 9.9798 9.66634 10.3334C9.66634 10.687 9.80682 11.0262 10.0569 11.2762C10.3069 11.5263 10.6461 11.6668 10.9997 11.6668Z" fill="#646464" />
</svg>

const truckModelIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M1.33301 12.6663C1.33301 13.7997 2.19967 14.6663 3.33301 14.6663H12.6663C13.7997 14.6663 14.6663 13.7997 14.6663 12.6663V7.33301H1.33301V12.6663ZM12.6663 2.66634H11.333V1.99967C11.333 1.59967 11.0663 1.33301 10.6663 1.33301C10.2663 1.33301 9.99967 1.59967 9.99967 1.99967V2.66634H5.99967V1.99967C5.99967 1.59967 5.73301 1.33301 5.33301 1.33301C4.93301 1.33301 4.66634 1.59967 4.66634 1.99967V2.66634H3.33301C2.19967 2.66634 1.33301 3.53301 1.33301 4.66634V5.99967H14.6663V4.66634C14.6663 3.53301 13.7997 2.66634 12.6663 2.66634Z" fill="#646464" />
</svg>

const Icons = {
    dashboardIcon,
    analyticsIcon,
    servicesIcon,
    subServivesIcon,
    blogIcon,
    feedbackIcon,
    crmIcon,
    reactRupeesIcon,

    homeIcon,
    logoutLocon,
    menuIcon,
    deleteIcon,
    reactEditIcon,
    reactPlusIcon,
    starGray,
    startBlack,
    blueCardCompanyIcon,
    greenLocationIcon,
    redLocationIcon,
    materialIcon,
    numberPlateIcon,
    wheelIcon,
    containerIcon,
    companyIcon,
    truckNumberPlateIcon,
    ownerIcon,
    buySellTruckIcon,
    kmsDrivernIcon,
    truckModelIcon
}

export default Icons