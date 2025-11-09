// src/api/hooks/useTerminalFirmByAttributes.ts
import useSWR from 'swr';
import { getContainerGradesByAttributes } from '../containers/grades';

export const useContainerGradesByAttributes = (
    companyId: string,
    options?: Record<string, any>
) => {

    const fetcherKey = companyId && options
        ? [`container-grades-by-attributes`, companyId, options]
        : null;

    const { data, error, isLoading, mutate } = useSWR(
        fetcherKey,
        async () =>
            await getContainerGradesByAttributes(companyId, options),
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
