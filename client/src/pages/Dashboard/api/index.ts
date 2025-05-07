import {getData} from "../../../api/APIMethods";
import {OrderTypes} from "../../../shared/types/entities/Order";

// PERCENTAGE_TYPES
export interface SessionTypesPercentageItem {
  DuoPercentage: number;
  MultiPercentage: number;
}
export interface OrderTypesPercentageItem {
  InDevicePercentage: number;
  OutDevicePercentage: number;
}
export interface PercentageResI<T> {
  status: string;
  data: {
    percentage: T[];
  };
}

// MONTHLY_PROFITS_TYPES
export interface ProfitItem {
  _id: {
    month: number;
    year: number;
    type?: OrderTypes;
  };
  value: number;
}
export interface ProfitsI<T> {
  status: string;
  data: {
    profits: T[];
  };
}

// DOCS_COUNT_TYPE
export interface DocsCountI {
  status: string;
  data: {
    orders: number;
    sessions: number;
    devices: number;
    snacks: number;
    users: number;
  };
}

const useDashboardAPIs = () => {
  // GET_ORDERS_MONTHLY_PROFITS
  async function getOrdersMonthlyProfits() {
    const res = await getData<ProfitsI<ProfitItem>>("/orders/monthly-profits");
    return res;
  }

  // GET_ORDERS_MONTHLY_PROFITS
  async function getOrderTypesPercentages() {
    const res = await getData<PercentageResI<OrderTypesPercentageItem>>(
      "/orders/types-percentage"
    );
    return res;
  }

  // GET_SESSIONS_MONTHLY_PROFITS
  async function getSessionsMonthlyProfits() {
    const res = await getData<ProfitsI<ProfitItem>>(
      "/game-sessions/monthly-profits"
    );
    return res;
  }

  // GET_SESSIONS_TYPES_PERCENTAGES
  async function getSessionsTypesPercentages() {
    const res = await getData<PercentageResI<SessionTypesPercentageItem>>(
      "/game-sessions/session-types-percentage"
    );
    return res;
  }

  // GET_DOCS_COUNT
  async function getDocsCount() {
    const res = await getData<DocsCountI>("/docs-count");
    return res;
  }

  return {
    getOrdersMonthlyProfits,
    getSessionsMonthlyProfits,
    getSessionsTypesPercentages,
    getOrderTypesPercentages,
    getDocsCount,
  };
};

export default useDashboardAPIs;
