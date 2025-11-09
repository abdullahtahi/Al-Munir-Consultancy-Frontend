// src/api/hooks/useTerminalFirmByAttributes.ts
import useSWR from 'swr';
import { getContainersByAttributes } from '../containers';

export const useContainersByAttributes = (
    companyId: string,
    terminalId: string,
    options: Record<string, any>
) => {
    const shouldFetch =
        companyId &&
        terminalId &&
        options?.container_number &&
        options.container_number.length >= 3;

    const fetcherKey = shouldFetch
        ? [`containers-by-attributes`, companyId, terminalId, options]
        : null;

    const { data, error, isLoading, mutate } = useSWR(
        fetcherKey,
        async () =>
            await getContainersByAttributes(companyId, terminalId, options),
        {
            revalidateOnMount: true,
            revalidateonFocus: false

        }
    );

    return {
        data,
        error,
        isLoading,
        mutate,
    };
};
