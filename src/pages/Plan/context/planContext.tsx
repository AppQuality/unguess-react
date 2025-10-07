import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { isDev } from 'src/common/isDevEnvironment';
import {
  GetPlansByPidCheckoutItemApiResponse,
  useGetPlansByPidCheckoutItemQuery,
  usePostCheckoutMutation,
} from 'src/features/api';
import { PlanTab, PlanTabName, PLAN_TABS } from '../common/constants';

interface PlanContextProps {
  activeTab: PlanTab;
  setActiveTab: (tab: PlanTab | PlanTabName) => void;
  setIsSaveTemplateModalOpen: (isOpen: boolean) => void;
  isSaveTemplateModalOpen: boolean;
  setIsDeleteModalOpen: (isOpen: boolean) => void;
  isDeleteModalOpen: boolean;
  isDateInThePastAlertModalOpen: boolean;
  setDateInThePastAlertModalOpen: (isOpen: boolean) => void;
  newModule: string | null;
  setNewModule: (module: string | null) => void;
  setCheckoutItem: (checkoutItem: GetPlansByPidCheckoutItemApiResponse) => void;
  checkoutItem: GetPlansByPidCheckoutItemApiResponse;
  setIsPaymentInProgress: (isInProgress: boolean) => void;
  isPaymentInProgress: boolean;
  buyPlanAction?: () => Promise<void>;
}

const PlanContext = createContext<PlanContextProps | null>(null);

export const PlanProvider = ({ children }: { children: ReactNode }) => {
  const { planId } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const initialTabName = searchParams.get('tab');
  const [postCheckout] = usePostCheckoutMutation();
  const { data: checkoutItemData } = useGetPlansByPidCheckoutItemQuery(
    { pid: planId ?? '' },
    { skip: !planId }
  );
  let initialTab = PLAN_TABS.find((t) => t.name === initialTabName);
  if (!initialTab) {
    [initialTab] = PLAN_TABS;
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      tab: initialTab.name,
    });
  }
  const baseUrl = isDev() ? 'https://dev.unguess.io' : 'https://app.unguess.io';
  const [activeTab, setActiveTabState] = useState<PlanTab>(initialTab);
  const [newModule, setNewModule] = useState<string | null>(null);
  const [checkoutItem, setCheckoutItem] =
    useState<GetPlansByPidCheckoutItemApiResponse>(
      {} as GetPlansByPidCheckoutItemApiResponse
    );

  const [isPaymentInProgress, setIsPaymentInProgress] = useState(false);

  // Overloaded setActiveTab function
  const setActiveTab = (tab: PlanTab | PlanTabName) => {
    let tabObj: PlanTab | undefined;
    if (typeof tab === 'string') {
      tabObj = PLAN_TABS.find((t) => t.name === tab);
    } else {
      tabObj = tab;
    }
    if (tabObj) {
      setActiveTabState(tabObj);
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        tab: tabObj.name,
      });
    }
  };

  const buyPlanAction = async () => {
    setIsPaymentInProgress(true);
    try {
      const response = await postCheckout({
        body: {
          meta: JSON.stringify(checkoutItemData?.metadata),
          price_id: checkoutItemData?.price_id ?? '',
          cancel_url: `${baseUrl}/plans/${planId}?payment=failed`,
          success_url: `${baseUrl}/plans/${planId}?payment=success`,
        },
      }).unwrap();
      if (response.url) {
        window.location.href = response.url;
      } else {
        setIsPaymentInProgress(false);
      }
    } catch (error) {
      setIsPaymentInProgress(false);
      console.error(`Error while checkout process: ${error}`);
    }
  };

  const [isSaveTemplateModalOpen, setIsSaveTemplateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDateInThePastAlertModalOpen, setDateInThePastAlertModalOpen] =
    useState(false);

  const planContextValue = useMemo(
    () => ({
      activeTab,
      setActiveTab,
      setIsSaveTemplateModalOpen,
      isSaveTemplateModalOpen,
      setIsDeleteModalOpen,
      isDeleteModalOpen,
      isDateInThePastAlertModalOpen,
      setDateInThePastAlertModalOpen,
      newModule,
      setNewModule,
      setCheckoutItem,
      checkoutItem,
      setIsPaymentInProgress,
      isPaymentInProgress,
      buyPlanAction,
    }),
    [
      activeTab,
      setIsSaveTemplateModalOpen,
      isSaveTemplateModalOpen,
      setIsDeleteModalOpen,
      isDeleteModalOpen,
      isDateInThePastAlertModalOpen,
      setDateInThePastAlertModalOpen,
      newModule,
      setNewModule,
      setCheckoutItem,
      checkoutItem,
      setIsPaymentInProgress,
      isPaymentInProgress,
      buyPlanAction,
    ]
  );

  return (
    <PlanContext.Provider value={planContextValue}>
      {children}
    </PlanContext.Provider>
  );
};

export const usePlanContext = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error('useTab must be used within a PlanProvider');
  }
  return context;
};
