import { useMomentStore } from '@/store/useMomentStore'
import { Heart, MessageSquare, Trash2 } from 'lucide-react'

export function MomentItem() {
  const { user, moment, interactions } = useMomentStore()

  return (
    <div className="px-2 pt-2 text-[15px]">
        <div className="flex gap-2">
            {/* Left: Avatar */}
            <img 
                src={user.avatar} 
                alt={user.nickname}
                className="w-[42px] h-[42px] rounded-md object-cover flex-shrink-0 bg-gray-200"
            />

            {/* Right: Content */}
            <div className="flex-1 min-w-0 pt-0.5">
                {/* Nickname */}
                <div className="font-bold text-wx-link text-[16px] leading-tight mb-1">
                    {user.nickname}
                </div>

                {/* Text Content */}
                {moment.text && (
                <div className="text-wx-text-primary dark:text-white mb-1 leading-relaxed break-words whitespace-pre-wrap text-[16px]">
                    {moment.text}
                </div>
                )}

                {/* Images Grid or Link Share */}
                {moment.type === 'link' ? (
                    <div className="mb-2 bg-[#f3f3f5] dark:bg-[#202020] p-1.5 flex items-center gap-2 rounded-[4px] cursor-pointer">
                        <img 
                            src={moment.linkInfo?.cover || '/favicon.png'} 
                            alt="Link Cover" 
                            className="w-[45px] h-[45px] object-cover bg-white"
                        />
                        <div className="flex-1 min-w-0 text-[14px] text-wx-text-primary dark:text-white/90 leading-tight line-clamp-2 pr-1">
                            {moment.linkInfo?.title || '分享链接'}
                        </div>
                    </div>
                ) : (
                    moment.images.length > 0 && (
                    <div className={`mb-2 grid gap-1.5 ${
                        moment.images.length === 1 ? 'grid-cols-1 max-w-[200px]' : 
                        moment.images.length === 4 ? 'grid-cols-2 max-w-[200px]' : 
                        'grid-cols-3'
                    }`}>
                        {moment.images.map((img, idx) => (
                        <div key={idx} className="aspect-square bg-gray-100 overflow-hidden">
                            <img src={img} alt={`Moment ${idx}`} className="w-full h-full object-cover" />
                        </div>
                        ))}
                    </div>
                    )
                )}

                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs text-wx-text-secondary mb-1">
                    <div className="flex items-center gap-2 text-[13px] flex-1 min-w-0 mr-2">
                        <span className="whitespace-nowrap flex-shrink-0">{moment.time}</span>
                        {moment.source && <span className="whitespace-nowrap flex-shrink-0">{moment.source}</span>}
                        {moment.location && <span className="text-wx-link truncate min-w-0">{moment.location}</span>}
                        <Trash2 className="w-[14px] h-[14px] text-wx-link flex-shrink-0" />
                    </div>
                    {/* Operation Menu Button */}
                    <div className="bg-gray-100 rounded-[4px] px-2.5 py-1.5 flex gap-1 cursor-pointer flex-shrink-0">
                        <div className="w-1 h-1 rounded-full bg-wx-link"></div>
                        <div className="w-1 h-1 rounded-full bg-wx-link"></div>
                    </div>
                </div>
            </div>
        </div>
        
        {/* Interactions Container */}
        {(interactions.likes.length > 0 || interactions.comments.length > 0) && (
            <div className="bg-wx-bg-comment dark:bg-[#202020] rounded-lg p-3 mt-1">
                {/* Likes Area */}
                {interactions.likes.length > 0 && (
                    <div className={`flex items-start gap-2 ${interactions.comments.length > 0 ? 'mb-4 border-b border-black/5 dark:border-white/10 pb-3' : ''}`}>
                        <Heart className="w-4 h-4 text-wx-link mt-2 stroke-[1.5]" />
                        <div className="flex-1 flex flex-wrap gap-1.5">
                            {interactions.likes.map((like) => (
                                <img 
                                    key={like.id} 
                                    src={like.avatar} 
                                    className="w-8 h-8 rounded-[4px] bg-gray-200 object-cover" 
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Comments Area */}
                {interactions.comments.length > 0 && (
                    <div className="flex items-start gap-2">
                        <MessageSquare className="w-4 h-4 text-wx-link mt-2 stroke-[1.5]" />
                        <div className="flex-1 flex flex-col gap-3">
                            {interactions.comments.map((comment) => (
                            <div key={comment.id} className="flex gap-2">
                                <img 
                                    src={comment.avatar} 
                                    alt={comment.user}
                                    className="w-8 h-8 rounded-[4px] bg-gray-200 object-cover flex-shrink-0"
                                />
                                <div className="flex-1 leading-tight text-[15px]">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <span className="text-wx-link font-semibold">{comment.user}</span>
                                        <span className="text-wx-text-secondary text-xs">12月13日 09:57</span>
                                    </div>
                                    <div className="text-wx-text-primary dark:text-white/90">
                                        {comment.replyTo && (
                                        <>
                                            <span>回复 </span>
                                            <span className="text-wx-link">{comment.replyTo}</span>
                                            <span>: </span>
                                        </>
                                        )}
                                        {comment.content}
                                    </div>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        )}
    </div>
  )
}
