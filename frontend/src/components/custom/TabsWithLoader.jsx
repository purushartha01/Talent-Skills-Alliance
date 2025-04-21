import { TabsContent } from '@radix-ui/react-tabs'
import { Loader } from 'lucide-react'
import { useEffect } from 'react'

const TabsWithLoader = ({ value, styles, isLoading, children }) => {

    useEffect(() => {
    }, [isLoading])

    return (
        <TabsContent value={value} className={styles}>
            {
                isLoading ? (
                    <div className="flex items-center justify-center">
                        <Loader className="animate-spin text-blue-400" stroke='black' size={30} />
                    </div>
                ) : (
                    children
                )
            }
        </TabsContent>
    )
}

export default TabsWithLoader;