
import { Loader } from 'lucide-react'
import { useContext, useEffect } from 'react'
import PostCard from './PostCard'
import { AuthContext } from '@/context/AuthContext'
import { TabsContent } from '@/components/ui/tabs';

const TabsWithLoader = ({ value, styles, isLoading, shouldParentUpdate, proposalList = [], children, savedProposals = [], appliedProposals = [] }) => {


    const user = useContext(AuthContext).getCurrAuth();

    useEffect(() => {
    }, [isLoading])

    return (
        <TabsContent value={value} className={styles}>
            <div className='flex flex-col gap-6 overflow-auto'>
                {
                    isLoading ? (
                        <div className="flex items-center justify-center">
                            <Loader className="animate-spin text-blue-400" stroke='black' size={30} />
                        </div>
                    ) : (
                        proposalList.length === 0 ? (
                            children
                        ) : (
                            proposalList?.map((proposal, index) => {

                                const isSaved = savedProposals?.some((savedProposal) => savedProposal._id === proposal._id);
                                const isApplied = proposal?.applicants?.some((applicant) => {
                                    console.log("applicant: ", applicant, "user: ", user?._id)
                                    return applicant._id === user?._id;
                                });
                                console.log("isApplied: ", isApplied)


                                return (
                                    <PostCard
                                        key={index}
                                        post={proposal}
                                        isSaved={isSaved}
                                        isApplied={isApplied}
                                        setStatusChange={shouldParentUpdate}
                                    />
                                )
                            })
                        )
                    )
                }
            </div>
        </TabsContent>
    )
}

export default TabsWithLoader;