import { useParams } from 'react-router-dom';

/**
 * Resolves the campaign/hub id from the route, supporting both the new
 * `:entityId` param and the legacy `:campaignId` param. A route only ever
 * carries one of the two, so the resolution order is irrelevant.
 */
export const useEntityId = () => {
  const { entityId, campaignId } = useParams<{
    entityId?: string;
    campaignId?: string;
  }>();
  return entityId ?? campaignId;
};
